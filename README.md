# Кофейная мастерская «Кварта» (Минск)

Официальный лендинг и сервис приёма заявок для независимой кофейной обжарки «Кварта» (г. Минск, ул. Короля, 9).

> **Слоган:** «Обжарили в четверг. Пьёте в выходные».  
> **Миссия:** Свежий кофе маленькими партиями по 5 кг — от ростера мастерской до чашки за 1–3 дня.

<img width="800" height="16384" alt="kvartavibe-d8ud vercel app_" src="https://github.com/user-attachments/assets/72d144fe-4a48-452d-b122-c5832d5f8391" />
<img width="2010" height="16384" alt="kvartavibe-d8ud vercel app_ (1)" src="https://github.com/user-attachments/assets/8d610380-a118-4543-80da-96462c55a811" />

---

## 1. Архитектура проекта

Проект реализован по разделённой архитектуре:

- **Frontend:** React 19, TypeScript, Tailwind CSS, Lucide Icons, шрифтовой дуэт *Fraunces* (ремесленный заголовочный антиква) + *Plus Jakarta Sans* (чистый наборный гротеск).
- **Backend:** Python 3.10+ и Flask (Application Factory).
- **База данных:** SQLite с SQLAlchemy 2.0.
- **Валидация:** Pydantic 2 + библиотека `phonenumbers` для строгой проверки номеров операторов Беларуси (`+375`).
- **Защита от дублей:** Атомарные транзакции с таблицей блокировок `phone_dedup_locks` и уникальными ключами. Блокировка повторных заявок с одного нормализованного номера в окне 10 минут (HTTP 409 Conflict).
- **Маркетинг:** Сквозное сохранение UTM-меток (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`), страницы входа и `document.referrer`.
- **Уведомления:** Модуль отправки лидов менеджеру в Telegram Bot (с защитой от сбоев — сбой Telegram не отменяет сохранённую заявку).

kvarta/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory, CORS, error handlers
│   │   ├── config.py            # Конфигурация из переменных окружения
│   │   ├── extensions.py        # SQLAlchemy engine и session factory
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── lead.py          # Модели Lead и PhoneDedupLock
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   └── leads.py         # Эндпоинты POST /api/lead и GET /api/health
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   ├── lead_service.py  # Атомарное сохранение с дедупликацией
│   │   │   └── telegram_service.py # Уведомления в Telegram
│   │   └── validators/
│   │       ├── __init__.py
│   │       └── lead_validator.py# Pydantic-схема и phonenumbers (BY)
│   ├── tests/
│   │   ├── __init__.py
│   │   ├── conftest.py          # Фикстуры pytest (изолированная тестовая БД)
│   │   └── test_leads.py        # 10 автоматических тестов API
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   └── run.py                   # Точка входа Flask-сервера
│
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Фиксированная навигация (Top Bar Contract)
│   │   ├── Hero.tsx             # Первый экран («Обжарили в четверг...»)
│   │   ├── About.tsx            # История Ани и Дмитрия, партии по 5 кг
│   │   ├── ProductCatalog.tsx   # 3 зерна + дрип-пакеты + подписка
│   │   ├── ProductModal.tsx     # Модальное окно товара с Escape/фокусом
│   │   ├── Subscription.tsx     # Блок подписки (2 пачки/мес, 54 BYN)
│   │   ├── HowItWorks.tsx       # График: Четверг (обжар) → Пятница (доставка)
│   │   ├── Delivery.tsx         # Самовывоз (Короля, 9) и доставка по Минску
│   │   ├── LeadForm.tsx         # Форма с маской +375, валидацией, 409
│   │   ├── Footer.tsx           # Подвал, контакты, часы работы
│   │   ├── PrivacyModal.tsx     # Документ-заготовка политики обработки данных
│   │   └── CraftArt.tsx         # Ремесленные векторные иллюстрации
│   ├── data/
│   │   └── products.ts          # Каталог сортов (Эфиопия, Колумбия, Бразилия, Дрипы)
│   ├── lib/
│   │   ├── phone.ts             # Клиентская маска и валидатор номера BY
│   │   └── utm.ts               # Сохранение UTM в sessionStorage
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── server.ts                    # Единый dev/prod сервер (Express + Vite proxy)
├── package.json
├── README.md
├── docker-compose.yml
└── vercel.json


### Результаты тестирования:

| № | Тест | Сценарий | Результат |
|---|---|---|---|
| 1 | `test_1_successful_lead_creation` | Успешное создание заявки, нормализация номера, сохранение в SQLite | **PASSED** |
| 2 | `test_2_invalid_phone_numbers` | Отклонение некорректных номеров и номеров не из Беларуси (+1, +7, мусор) | **PASSED** |
| 3 | `test_3_missing_required_fields` | Проверка обязательных полей (пустое имя, отсутствие телефона/интереса) | **PASSED** |
| 4 | `test_4_duplicate_lead_within_10_minutes` | Повторная заявка с тем же номером в течение 10 минут возвращает 409 Conflict | **PASSED** |
| 5 | `test_5_new_lead_after_window_expires` | Разрешение новой заявки после истечения 10-минутного окна | **PASSED** |
| 6 | `test_6_concurrent_parallel_requests` | Два одновременных параллельных потока с одним номером: ровно один 201, один 409 | **PASSED** |
| 7 | `test_7_database_error_handling` | Ошибка БД возвращает 500 без раскрытия внутренней структуры или стек-трейса | **PASSED** |
| 8 | `test_8_preserves_utm_and_referrer` | Корректное сохранение UTM-меток, referrer и страницы входа | **PASSED** |
| 9 | `test_9_invalid_interest_type` | Отклонение некорректных значений enum для типа интереса | **PASSED** |
| 10 | `test_10_invalid_json_payload` | Отклонение невалидного JSON и запросов с некорректным Content-Type | **PASSED** |

---

## 2. База данных и дедупликация

### Схема базы данных (SQLite):

1. **`leads`**:
   - `id` (INTEGER PRIMARY KEY AUTOINCREMENT)
   - `name` (VARCHAR(100), NOT NULL)
   - `phone` (VARCHAR(32), NOT NULL, INDEX) — нормализованный номер E.164 (`+37529XXXXXXX`)
   - `interest` (VARCHAR(32), NOT NULL) — `subscription`, `one_time`, `question`
   - `comment` (TEXT, NULL)
   - `product` (VARCHAR(150), NULL)
   - `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (VARCHAR, NULL)
   - `landing_page` (VARCHAR(255), NULL)
   - `referrer` (VARCHAR(500), NULL)
   - `created_at` (DATETIME, NOT NULL, UTC)

2. **`phone_dedup_locks`**:
   - `phone` (VARCHAR(32) PRIMARY KEY)
   - `locked_until` (DATETIME, NOT NULL, INDEX)
   - `last_lead_id` (INTEGER, NULL)
   - `updated_at` (DATETIME, NOT NULL)

### Как работает атомарная защита от дублей:
1. При получении заявки номер нормализуется библиотекой `phonenumbers` до формата `+375...`.
2. Внутри транзакции проверяется запись в `phone_dedup_locks` для данного номера.
3. Если текущее время меньше `locked_until`, транзакция откатывается и сервер возвращает `HTTP 409 Conflict` с количеством секунд ожидания.
4. Поле `phone` является первичным ключом в `phone_dedup_locks`. При попытке одновременной параллельной вставки двух одинаковых номеров ограничение целостности (`IntegrityError`) гарантирует, что вторая операция будет безопасно отклонена.
5. После истечения 10 минут блокировка перезаписывается новой датой, позволяя клиенту отправить следующую заявку.

### Резервное копирование и сохранность данных:
- По умолчанию база хранится в файле `backend/kvarta.db`.
- **Бэкап:** `sqlite3 backend/kvarta.db ".backup 'kvarta_backup_$(date +%Y%m%d).db'"`
- **Развёртывание на облачных серверах:** Не используйте эфемерную файловую систему контейнеров без примонтированного Persistent Volume. В `docker-compose.yml` настроен именованный том `kvarta_data:/data`. При перезапуске контейнеров данные сохраняются.

---

## 3. Настройка Telegram-уведомлений

1. Создайте бота через [@BotFather](https://t.me/BotFather) и скопируйте токен.
2. Узнайте ваш Chat ID через [@userinfobot](https://t.me/userinfobot).
3. В файле `backend/.env` укажите:
   ```env
   TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
   TELEGRAM_CHAT_ID="123456789"
   ```
4. При создании каждой новой уникальной заявки менеджер мгновенно получает сообщение с именем, телефоном, выбранным сортом, комментарием и маркетинговыми метками.

---

## 4. Чек-лист перед публикацией

Перед запуском сайта в рабочий продакшн необходимо:

- [ ] **Контакты:** В `src/components/Footer.tsx` и `backend/.env` заменить тестовый номер телефона `+375 (29) 123-45-67` на реальный номер мастерской.
- [ ] **Мессенджеры:** Указать реальные ники Telegram и Instagram обжарки.
- [ ] **Юридические реквизиты:** Внести официальные реквизиты юридического лица / ИП в политику обработки персональных данных (`src/components/PrivacyModal.tsx`) и утвердить документ.
- [ ] **Telegram Бот:** Заполнить переменные `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` на продакшн-сервере.
- [ ] **Секретный ключ:** Задать криптографически стойкий `SECRET_KEY` в `backend/.env`.
