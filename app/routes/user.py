from .index import router
from flask import request
from .. import db
from ..models import User
from flask import jsonify


# Create user
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
    return 'User created', 201


# Get all users
@router.route('/users', methods=['GET'])
def index():
    users = User.query.all()
    return jsonify(User.serialize_list(users))


# Get user by id
@router.route('/user/<int:user_id>', methods=['GET'])
def show(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        return jsonify(User.serialize(user))
    return f"User with id {user_id} doesn't exist"


# Update user
@router.route('/user/<int:user_id>', methods=['PUT'])
def update(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        payload = request.get_json()
        user.email = payload['email']
        user.first_name = payload['first_name']
        user.last_name = payload['last_name']
        user.role_id = payload['role_id']
        db.session.commit()
        return 'User Updated'
    return f"User with id {user_id} doesn't exist"


# Delete user
@router.route('/user/<int:user_id>', methods=['DELETE'])
def destroy(user_id):
    user = User.query.filter_by(id=user_id).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return 'User deleted'
    return f"User with id {user_id} doesn't exist"
