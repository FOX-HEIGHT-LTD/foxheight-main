from flask import Flask
from flask_cors import CORS


def create_app():
    # Create a Flask application instance
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes

    # Custom Error Handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'message': 'Resource not found'}, 404

    @app.errorhandler(500)
    def internal_error(error):
        return {'message': 'Internal server error'}, 500

    # Register Blueprints
    from .blueprints.example import example_bp
    app.register_blueprint(example_bp)

    # Security Middleware: You can implement your preferred middleware here
    # For example, to check for JWT tokens, etc.

    return app
