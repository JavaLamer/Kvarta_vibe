import datetime
import concurrent.futures
from unittest.mock import patch
from app.models.lead import Lead, PhoneDedupLock
from app.extensions import get_db_session

def test_1_successful_lead_creation(client, db_session):
    payload = {
        "name": "Алексей Смирнов",
        "phone": "+375 (29) 123-45-67",
        "interest": "subscription",
        "comment": "Хочу две пачки в месяц для фильтр-кофе",
        "product": "Подписка на кофе",
        "utm_source": "instagram"
    }
    response = client.post("/api/lead", json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["success"] is True
    assert "lead_id" in data
    assert data["data"]["phone"] == "+375291234567"

    # Verify saved in SQLite database
    saved = db_session.query(Lead).filter(Lead.id == data["lead_id"]).first()
    assert saved is not None
    assert saved.name == "Алексей Смирнов"
    assert saved.phone == "+375291234567"
    assert saved.interest == "subscription"

def test_2_invalid_phone_numbers(client):
    invalid_phones = [
        "12345",
        "+1 555 123 4567",       # USA
        "+7 999 123 45 67",       # Russia
        "invalid_phone_string",
        "+375 00 000-00-00",     # Invalid area code
        "+375 21 123-45-67",     # Code 21 (Vitebsk) is not in allowed list [29, 33, 44, 17, 25, 15]
    ]
    for phone in invalid_phones:
        response = client.post("/api/lead", json={
            "name": "Дмитрий",
            "phone": phone,
            "interest": "one_time"
        })
        assert response.status_code == 422
        data = response.get_json()
        assert data["error"] == "validation_error"
        assert "phone" in data["field_errors"]

def test_3_missing_required_fields(client):
    # Empty name
    res1 = client.post("/api/lead", json={
        "name": "   ",
        "phone": "+375 29 111-22-33",
        "interest": "subscription"
    })
    assert res1.status_code == 422
    assert "name" in res1.get_json()["field_errors"]

    # Missing phone
    res2 = client.post("/api/lead", json={
        "name": "Анна",
        "interest": "subscription"
    })
    assert res2.status_code == 422
    assert "phone" in res2.get_json()["field_errors"]

    # Missing interest
    res3 = client.post("/api/lead", json={
        "name": "Анна",
        "phone": "+375 29 111-22-33"
    })
    assert res3.status_code == 422
    assert "interest" in res3.get_json()["field_errors"]

def test_4_duplicate_lead_within_10_minutes(client):
    payload = {
        "name": "Елена",
        "phone": "+375 (33) 654-32-10",
        "interest": "one_time",
        "product": "Эфиопия Иргачеффе"
    }
    # First submission succeeds
    res1 = client.post("/api/lead", json=payload)
    assert res1.status_code == 201

    # Second submission with different format of the exact same number (national 8033...)
    duplicate_payload = {
        "name": "Елена Другая",
        "phone": "80336543210",
        "interest": "subscription"
    }
    res2 = client.post("/api/lead", json=duplicate_payload)
    assert res2.status_code == 409
    data = res2.get_json()
    assert data["error"] == "duplicate_request"
    assert "Заявка с этого номера уже принята" in data["message"]

def test_5_new_lead_after_window_expires(client, db_session):
    phone = "+375 (25) 999-88-77"
    normalized = "+375259998877"

    # First submission
    res1 = client.post("/api/lead", json={
        "name": "Михаил",
        "phone": phone,
        "interest": "question"
    })
    assert res1.status_code == 201

    # Expire the lock manually in DB to simulate 10 minutes passing
    lock = db_session.query(PhoneDedupLock).filter(PhoneDedupLock.phone == normalized).first()
    assert lock is not None
    lock.locked_until = datetime.datetime.utcnow() - datetime.timedelta(seconds=1)
    db_session.commit()

    # Second submission should now succeed
    res2 = client.post("/api/lead", json={
        "name": "Михаил",
        "phone": phone,
        "interest": "subscription"
    })
    assert res2.status_code == 201

def test_6_concurrent_parallel_requests(app):
    phone = "+375 (44) 700-11-22"
    payload = {
        "name": "Параллельный Клиент",
        "phone": phone,
        "interest": "one_time",
        "product": "Колумбия Уила"
    }

    def send_request():
        with app.test_client() as c:
            return c.post("/api/lead", json=payload).status_code

    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as executor:
        f1 = executor.submit(send_request)
        f2 = executor.submit(send_request)
        results = [f1.result(), f2.result()]

    # Exactly one must succeed (201) and one must be rejected (409)
    assert sorted(results) == [201, 409]

    # Verify only 1 record exists in DB
    session = get_db_session()
    leads = session.query(Lead).filter(Lead.phone == "+375447001122").all()
    assert len(leads) == 1
    session.close()

def test_7_database_error_handling(client):
    payload = {
        "name": "Ольга",
        "phone": "+375 29 888-77-66",
        "interest": "subscription"
    }
    with patch("app.routes.leads.create_lead_with_atomic_dedup") as mock_service:
        from app.services.lead_service import DatabaseServiceError
        mock_service.side_effect = DatabaseServiceError("Служебная ошибка")

        response = client.post("/api/lead", json=payload)
        assert response.status_code == 500
        data = response.get_json()
        assert data["error"] == "database_error"
        # Must not leak stack traces or internal SQL details
        assert "Служебная ошибка" not in data["message"]

def test_8_preserves_utm_and_referrer(client, db_session):
    payload = {
        "name": "Виктор",
        "phone": "+375 29 333-44-55",
        "interest": "one_time",
        "product": "Бразилия Серрадо",
        "utm_source": "yandex",
        "utm_medium": "cpc",
        "utm_campaign": "minsk_specialty_coffee",
        "utm_content": "ad_roaster_01",
        "utm_term": "кофе минск",
        "landing_page": "/?utm_source=yandex",
        "referrer": "https://yandex.by/search"
    }
    response = client.post("/api/lead", json=payload)
    assert response.status_code == 201

    saved = db_session.query(Lead).filter(Lead.phone == "+375293334455").first()
    assert saved is not None
    assert saved.utm_source == "yandex"
    assert saved.utm_medium == "cpc"
    assert saved.utm_campaign == "minsk_specialty_coffee"
    assert saved.utm_content == "ad_roaster_01"
    assert saved.utm_term == "кофе минск"
    assert saved.landing_page == "/?utm_source=yandex"
    assert saved.referrer == "https://yandex.by/search"

def test_9_invalid_interest_type(client):
    payload = {
        "name": "Мария",
        "phone": "+375 29 555-66-77",
        "interest": "invalid_plan"
    }
    response = client.post("/api/lead", json=payload)
    assert response.status_code == 422
    data = response.get_json()
    assert "interest" in data["field_errors"]

def test_10_invalid_json_payload(client):
    # Non-json request
    res1 = client.post("/api/lead", data="plain text not json", content_type="text/plain")
    assert res1.status_code == 400
    assert res1.get_json()["error"] == "bad_request"
