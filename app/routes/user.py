import json
from .index import router
from flask import request
from .. import db
from ..models import User
from flask import jsonify


@router.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return jsonify(User.serialize_list(users))


@router.route('/user/<int:user_id>', methods=['GET'])
def show(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify(User.serialize(user))
    return f"User with id {user_id} doesn't exist"


@router.route('/user', methods=['PUT'])
def update():
    return 'user created', 201


@router.route('/user', methods=['DELETE'])
def destroy():
    return 'user created', 201


@router.route('/user', methods=['POST'])
def store():
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
