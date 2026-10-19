import datetime
from sqlalchemy import Column, Integer, String, Text, DateTime
from app.extensions import Base

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(32), nullable=False, index=True)
    interest = Column(String(32), nullable=False)
    comment = Column(Text, nullable=True)
    product = Column(String(150), nullable=True)
    
    # Marketing & tracking attributes
    utm_source = Column(String(100), nullable=True)
    utm_medium = Column(String(100), nullable=True)
    utm_campaign = Column(String(100), nullable=True)
    utm_content = Column(String(100), nullable=True)
    utm_term = Column(String(100), nullable=True)
    landing_page = Column(String(255), nullable=True)
    referrer = Column(String(500), nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "interest": self.interest,
            "comment": self.comment,
            "product": self.product,
            "utm_source": self.utm_source,
            "utm_medium": self.utm_medium,
            "utm_campaign": self.utm_campaign,
            "utm_content": self.utm_content,
            "utm_term": self.utm_term,
            "landing_page": self.landing_page,
            "referrer": self.referrer,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }

class PhoneDedupLock(Base):
    __tablename__ = "phone_dedup_locks"

    phone = Column(String(32), primary_key=True)
    locked_until = Column(DateTime, nullable=False, index=True)
    last_lead_id = Column(Integer, nullable=True)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, nullable=False)
