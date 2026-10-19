import datetime
import logging
from typing import Tuple
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError, SQLAlchemyError

from app.models.lead import Lead, PhoneDedupLock
from app.validators.lead_validator import LeadCreateSchema

logger = logging.getLogger(__name__)

class DuplicateLeadError(Exception):
    def __init__(self, message: str, remaining_seconds: int = 600):
        super().__init__(message)
        self.message = message
        self.remaining_seconds = remaining_seconds

class DatabaseServiceError(Exception):
    def __init__(self, message: str = "Внутренняя ошибка базы данных"):
        super().__init__(message)
        self.message = message

def create_lead_with_atomic_dedup(
    session: Session,
    lead_data: LeadCreateSchema,
    dedup_window_seconds: int = 600
) -> Tuple[Lead, int]:
    """
    Atomically saves a new lead with a 10-minute duplicate prevention lock.
    Guarantees race-condition safety via primary-key constraints and transaction rollbacks.
    Returns (created_lead, remaining_lock_seconds).
    Raises DuplicateLeadError if the phone number submitted a lead within the window.
    Raises DatabaseServiceError on unexpected database failures.
    """
    now = datetime.datetime.utcnow()
    normalized_phone = lead_data.phone

    try:
        # Step 1: Check existing lock
        existing_lock = (
            session.query(PhoneDedupLock)
            .filter(PhoneDedupLock.phone == normalized_phone)
            .first()
        )

        if existing_lock and existing_lock.locked_until > now:
            remaining = max(1, int((existing_lock.locked_until - now).total_seconds()))
            logger.info("Duplicate lead rejected for phone %s. Remaining: %s seconds", normalized_phone, remaining)
            raise DuplicateLeadError(
                message="Заявка с этого номера уже принята. Наш менеджер свяжется с вами. Повторная отправка возможна через 10 минут.",
                remaining_seconds=remaining
            )

        # Step 2: Create lead instance
        lead = Lead(
            name=lead_data.name,
            phone=lead_data.phone,
            interest=lead_data.interest,
            comment=lead_data.comment,
            product=lead_data.product,
            utm_source=lead_data.utm_source,
            utm_medium=lead_data.utm_medium,
            utm_campaign=lead_data.utm_campaign,
            utm_content=lead_data.utm_content,
            utm_term=lead_data.utm_term,
            landing_page=lead_data.landing_page,
            referrer=lead_data.referrer,
            created_at=now,
        )
        session.add(lead)
        session.flush()  # populate lead.id

        # Step 3: Update or Insert the dedup lock
        new_locked_until = now + datetime.timedelta(seconds=dedup_window_seconds)
        if existing_lock:
            existing_lock.locked_until = new_locked_until
            existing_lock.last_lead_id = lead.id
            existing_lock.updated_at = now
        else:
            new_lock = PhoneDedupLock(
                phone=normalized_phone,
                locked_until=new_locked_until,
                last_lead_id=lead.id,
                updated_at=now
            )
            session.add(new_lock)

        session.commit()
        logger.info("Successfully created lead ID %s for phone %s", lead.id, normalized_phone)
        return lead, dedup_window_seconds

    except IntegrityError as exc:
        session.rollback()
        # Handle concurrent parallel collision on PhoneDedupLock primary key
        # Check if the colliding lock is active
        lock_check = (
            session.query(PhoneDedupLock)
            .filter(PhoneDedupLock.phone == normalized_phone)
            .first()
        )
        if lock_check and lock_check.locked_until > now:
            remaining = max(1, int((lock_check.locked_until - now).total_seconds()))
            raise DuplicateLeadError(
                message="Параллельный запрос с этим номером уже обработан. Заявка принята.",
                remaining_seconds=remaining
            )
        logger.error("Integrity error creating lead: %s", exc)
        raise DatabaseServiceError("Ошибка целостности данных при сохранении")

    except DuplicateLeadError:
        session.rollback()
        raise

    except SQLAlchemyError as exc:
        session.rollback()
        logger.error("Database error in create_lead_with_atomic_dedup: %s", exc)
        raise DatabaseServiceError("Не удалось сохранить заявку из-за ошибки базы данных")
