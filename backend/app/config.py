import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-kvarta-roastery-minsk-2026")
    DATABASE_URL = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR / 'kvarta.db'}")
    CORS_ORIGINS = [origin.strip() for origin in os.getenv("CORS_ORIGINS", "*").split(",") if origin.strip()]
    
    # Telegram settings
    TELEGRAM_BOT_TOKEN = "8927293424:AAE59vi8SEkQVCXm3zqr3PVcKNx19l9e3Wo"
    TELEGRAM_CHAT_ID = "695156651"

    # Rate limiting & deduplication window (in seconds, 10 minutes = 600)
    DEDUP_WINDOW_SECONDS = int(os.getenv("DEDUP_WINDOW_SECONDS", "600"))

class TestConfig(Config):
    TESTING = True
    DATABASE_URL = "sqlite:///test_kvarta.db"
    DEDUP_WINDOW_SECONDS = 600
