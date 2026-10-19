from flask import Flask, jsonify
from flask_cors import CORS
from app.config import Config
from app.extensions import init_db, Base
from app.routes.leads import leads_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize CORS
    cors_origins = app.config.get("CORS_ORIGINS", "*")
    CORS(app, resources={r"/api/*": {"origins": cors_origins}})

    # Initialize Database & create schema
    engine, _ = init_db(app.config["DATABASE_URL"])
    Base.metadata.create_all(bind=engine)

    # Register Blueprints
    app.register_blueprint(leads_bp)

    # Custom HTTP error handlers
    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "not_found", "message": "Маршрут не найден"}), 404

    @app.errorhandler(405)
    def method_not_allowed(e):
        return jsonify({"error": "method_not_allowed", "message": "Метод HTTP не поддерживается"}), 405

    @app.errorhandler(500)
    def internal_error(e):
        return jsonify({"error": "server_error", "message": "Внутренняя ошибка сервера"}), 500

    return app
