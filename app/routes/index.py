from flask import Blueprint

router = Blueprint('router', __name__)


@router.route("/", methods=['GET'])
def home():
    return 'home'


# import declared routes
import app.routes.meet
