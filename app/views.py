from flask import Blueprint

views = Blueprint('views', __name__)


@views.route('/')
def index():
    return 'Index Page'


@views.route('/hello')
def hello():
    return 'Hello, World'
