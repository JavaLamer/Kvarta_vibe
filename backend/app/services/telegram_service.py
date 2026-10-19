import logging
import requests
from typing import Optional
from app.models.lead import Lead

logger = logging.getLogger(__name__)

INTEREST_LABELS = {
    "subscription": "Регулярная подписка (2 пачки/мес, 54 BYN)",
    "one_time": "Разовый заказ зёрен или дрипов",
    "question": "Вопрос мастерской / консультация"
}

def send_telegram_lead_notification(
    lead: Lead,
    bot_token: Optional[str],
    chat_id: Optional[str]
) -> bool:
    """
    Sends an instant notification to the roastery manager via Telegram Bot.
    Guaranteed not to raise exceptions: errors are logged and return False.
    """
    if not bot_token or not chat_id:
        logger.info("Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.")
        return False

    interest_text = INTEREST_LABELS.get(lead.interest, lead.interest)
    product_text = f"\n☕ Товар: <b>{lead.product}</b>" if lead.product else ""
    comment_text = f"\n💬 Комментарий: <i>{lead.comment}</i>" if lead.comment else ""
    
    # Marketing source attribution
    utm_parts = []
    if lead.utm_source:
        utm_parts.append(f"source: {lead.utm_source}")
    if lead.utm_campaign:
        utm_parts.append(f"campaign: {lead.utm_campaign}")
    if lead.utm_medium:
        utm_parts.append(f"medium: {lead.utm_medium}")
    utm_info = f"\n📊 Метки: {', '.join(utm_parts)}" if utm_parts else ""

    message = (
        "🔔 <b>Новая заявка в обжарку «Кварта»!</b>\n\n"
        f"👤 Имя: <b>{lead.name}</b>\n"
        f"📞 Телефон: <code>{lead.phone}</code>\n"
        f"📌 Интерес: {interest_text}"
        f"{product_text}"
        f"{comment_text}"
        f"{utm_info}\n"
        f"🕒 Время (UTC): {lead.created_at.strftime('%Y-%m-%d %H:%M:%S') if lead.created_at else '—'}"
    )

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
        "parse_mode": "HTML"
    }

    try:
        response = requests.post(url, json=payload, timeout=5)
        if response.status_code == 200:
            logger.info("Telegram notification successfully sent for lead ID %s", lead.id)
            return True
        else:
            logger.warning("Telegram notification failed (status %s): %s", response.status_code, response.text)
            return False
    except Exception as exc:
        logger.error("Error sending Telegram notification for lead ID %s: %s", lead.id, exc)
        return False
