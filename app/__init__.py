from flask import Flask
from .routes.index import router


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'lorem ipsum'
    app.register_blueprint(router)
    return app
