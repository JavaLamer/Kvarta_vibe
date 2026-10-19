import logging
from flask import Blueprint, request, jsonify, current_app
from pydantic import ValidationError

from app.extensions import get_db_session
from app.validators.lead_validator import LeadCreateSchema
from app.services.lead_service import (
    create_lead_with_atomic_dedup,
    DuplicateLeadError,
    DatabaseServiceError
)
from app.services.telegram_service import send_telegram_lead_notification

logger = logging.getLogger(__name__)

leads_bp = Blueprint("leads", __name__, url_prefix="/api")

@leads_bp.route("/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "kvarta-coffee-roastery-api",
        "location": "Minsk, Korolya 9"
    }), 200

@leads_bp.route("/lead", methods=["POST"])
def submit_lead():
    # 1. Check content type
    if not request.is_json:
        return jsonify({
            "error": "bad_request",
            "message": "Запрос должен содержать JSON данные"
        }), 400

    # 2. Check payload size (limit to 64KB)
    if request.content_length and request.content_length > 64 * 1024:
        return jsonify({
            "error": "payload_too_large",
            "message": "Размер запроса превышает допустимый лимит"
        }), 413

    raw_data = request.get_json(silent=True)
    if raw_data is None or not isinstance(raw_data, dict):
        return jsonify({
            "error": "invalid_json",
            "message": "Некорректный формат JSON в теле запроса"
        }), 400

    # 3. Pydantic validation
    try:
        validated_schema = LeadCreateSchema(**raw_data)
    except ValidationError as val_err:
        field_errors = {}
        for err in val_err.errors():
            field_name = str(err["loc"][0]) if err["loc"] else "body"
            # Extract user friendly message from ValueError or pydantic
            field_errors[field_name] = err["msg"].replace("Value error, ", "")
        
        return jsonify({
            "error": "validation_error",
            "message": "Пожалуйста, проверьте корректность введённых данных",
            "field_errors": field_errors
        }), 422

    # 4. Service execution with atomic dedup
    db_session = get_db_session()
    try:
        dedup_window = current_app.config.get("DEDUP_WINDOW_SECONDS", 600)
        lead, remaining_lock = create_lead_with_atomic_dedup(
            session=db_session,
            lead_data=validated_schema,
            dedup_window_seconds=dedup_window
        )

        # 5. Telegram notification (background / non-blocking guarantee)
        bot_token = current_app.config.get("TELEGRAM_BOT_TOKEN")
        chat_id = current_app.config.get("TELEGRAM_CHAT_ID")
        send_telegram_lead_notification(lead, bot_token=bot_token, chat_id=chat_id)

        return jsonify({
            "success": True,
            "lead_id": lead.id,
            "message": "Заявка успешно принята! Наш менеджер свяжется с вами, чтобы согласовать детали заказа и доставки.",
            "data": {
                "name": lead.name,
                "phone": lead.phone,
                "interest": lead.interest,
                "product": lead.product,
                "created_at": lead.created_at.isoformat() if lead.created_at else None
            }
        }), 201

    except DuplicateLeadError as dup_err:
        return jsonify({
            "error": "duplicate_request",
            "message": dup_err.message,
            "retry_after_seconds": dup_err.remaining_seconds
        }), 409

    except DatabaseServiceError as db_err:
        logger.error("Database service error: %s", db_err.message)
        return jsonify({
            "error": "database_error",
            "message": "Не удалось сохранить заявку. Пожалуйста, попробуйте повторить через минуту или свяжитесь с нами напрямую."
        }), 500

    except Exception as exc:
        logger.error("Unexpected server error in submit_lead: %s", exc)
        return jsonify({
            "error": "server_error",
            "message": "Произошла непредвиденная ошибка на сервере. Пожалуйста, попробуйте позже."
        }), 500

    finally:
        db_session.close()
