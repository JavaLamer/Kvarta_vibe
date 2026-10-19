from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

Base = declarative_base()
engine = None
SessionLocal = None

def init_db(database_url: str):
    global engine, SessionLocal
    connect_args = {"check_same_thread": False} if database_url.startswith("sqlite") else {}
    engine = create_engine(database_url, connect_args=connect_args)
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    return engine, SessionLocal

def get_db_session():
    if SessionLocal is None:
        raise RuntimeError("Database session factory is not initialized. Call init_db first.")
    return SessionLocal()
