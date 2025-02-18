from flask import Flask
from flask_cors import CORS

# from .utils.db import supabase  # Import Supabase connection

def create_app():
    """Initialize and configure the Flask application."""
    app = Flask(__name__)

    # Enable CORS for frontend requests
    CORS(app, supports_credentials=True)

    # Import and register blueprints (API routes)
    from app.routes.trips import trips_bp
    from app.routes.stops import stops_bp
    from app.routes.wrapped import wrapped_bp

    app.register_blueprint(trips_bp, url_prefix='/api/trips')
    app.register_blueprint(stops_bp, url_prefix='/api/stops')
    app.register_blueprint(wrapped_bp, url_prefix='/api/wrapped')
    # app.register_blueprint(users_bp, url_prefix='/api/users')

    return app
