import phonenumbers
from typing import Optional, Literal
from pydantic import BaseModel, Field, field_validator, ValidationInfo

InterestType = Literal["subscription", "one_time", "question"]

def normalize_by_phone(raw_phone: str) -> str:
    """
    Validates and normalizes Belarusian phone numbers (+375).
    Accepts formats with spaces, hyphens, brackets, or national prefix (80...).
    Returns normalized E.164 string like '+375291234567'.
    Raises ValueError with user-friendly Russian explanation if invalid.
    """
    if not raw_phone or not isinstance(raw_phone, str):
        raise ValueError("Номер телефона обязателен для заполнения")

    cleaned = raw_phone.strip()
    
    # Handle Belarusian internal dialing format starting with 80 (e.g. 80291234567 -> +375291234567)
    if cleaned.startswith("80") and len(cleaned.replace(" ", "").replace("-", "").replace("(", "").replace(")", "")) == 11:
        # replace leading 80 with +375
        digits_only = "".join(ch for ch in cleaned if ch.isdigit())
        cleaned = "+375" + digits_only[2:]

    try:
        parsed = phonenumbers.parse(cleaned, "BY")
    except phonenumbers.NumberParseException:
        raise ValueError("Не удалось распознать номер телефона. Пример: +375 (29) 123-45-67")

    # Ensure it's a valid number for Belarus (+375)
    is_valid_by = phonenumbers.is_valid_number_for_region(parsed, "BY")
    if not is_valid_by or parsed.country_code != 375:
        raise ValueError("Введите корректный белорусский номер телефона с кодом 29, 33, 44, 17, 25 или 15")

    formatted_e164 = phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
    
    # Check operator / area code (digits 4 and 5 in +375XX...)
    allowed_codes = {"29", "33", "44", "17", "25", "15"}
    code = formatted_e164[4:6]
    if code not in allowed_codes:
        raise ValueError("Разрешены только номера операторов с кодами 29, 33, 44, 17, 25, 15 (Беларусь)")

    return formatted_e164


class LeadCreateSchema(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str
    interest: InterestType
    comment: Optional[str] = Field(default=None, max_length=1000)
    product: Optional[str] = Field(default=None, max_length=150)
    
    utm_source: Optional[str] = Field(default=None, max_length=100)
    utm_medium: Optional[str] = Field(default=None, max_length=100)
    utm_campaign: Optional[str] = Field(default=None, max_length=100)
    utm_content: Optional[str] = Field(default=None, max_length=100)
    utm_term: Optional[str] = Field(default=None, max_length=100)
    landing_page: Optional[str] = Field(default=None, max_length=255)
    referrer: Optional[str] = Field(default=None, max_length=500)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        stripped = v.strip()
        if not stripped:
            raise ValueError("Пожалуйста, укажите ваше имя")
        return stripped

    @field_validator("phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        return normalize_by_phone(v)

    @field_validator("comment", "product", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "landing_page", "referrer")
    @classmethod
    def strip_optional_strings(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return None
        stripped = v.strip()
        return stripped if stripped else None
