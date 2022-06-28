from .. import db
from ..services.serializer import Serializer
from sqlalchemy.sql import func


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))

    def serialize_list(self):
        d = Serializer.serialize_list(self)
        return d

    def serialize(self):
        d = Serializer.serialize(self)
        del d['password']
        return d
