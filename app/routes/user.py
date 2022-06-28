from .index import router
from flask import request
from .. import db
from ..models import User


@router.route('/user', methods=['POST'])
def create():
    payload = request.get_json()
    email = payload['email']
    password = payload['password']
    first_name = payload['first_name']
    last_name = payload['last_name']
    role_id = payload['role_id']
    user = User(email=email, password=password, first_name=first_name, last_name=last_name, role_id=role_id)
    db.session.add(user)
    db.session.commit()
    return 'user created', 201
