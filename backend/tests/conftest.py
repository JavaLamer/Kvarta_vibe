import os
import pytest
from app import create_app
from app.config import TestConfig
from app.extensions import init_db, Base, get_db_session

@pytest.fixture(scope="function")
def app():
    # Remove test db if exists
    if os.path.exists("test_kvarta.db"):
        try:
            os.remove("test_kvarta.db")
        except OSError:
            pass

    test_app = create_app(TestConfig)
    with test_app.app_context():
        engine, _ = init_db(TestConfig.DATABASE_URL)
        Base.metadata.create_all(bind=engine)
        yield test_app
        Base.metadata.drop_all(bind=engine)

    if os.path.exists("test_kvarta.db"):
        try:
            os.remove("test_kvarta.db")
        except OSError:
            pass

@pytest.fixture(scope="function")
def client(app):
    return app.test_client()

@pytest.fixture(scope="function")
def db_session(app):
    session = get_db_session()
    yield session
    session.close()
