import random
import click
from faker import Faker
from werkzeug.security import generate_password_hash

from . import models, __init__
# from app.models.User import User
# from app.services.rand import random_email, random_char

# initialize faker service
# fake = Faker()
#
#
# # RUN CLI COMMAND: python app/seeders/user.py --count=50
#
# @click.command()
# @click.option('--count', default=20, help='number of users to be generated')
# def add_users(count):
#     for i in range(0, count):
#         email = random_email()
#         password = generate_password_hash("password")
#         first_name = random_char()
#         last_name = random_char()
#         role_id = random.randint(1, 3)
#
#         user = User(email, password, first_name, last_name, role_id)
#         app.db.session.add(user)
#         app.db.session.commit()
#
#     return click.echo('{} users were added successfully to the database.'.format(count))
