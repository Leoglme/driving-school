import random
import string


# Random char
def random_char(char_num=7):
    return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))


# Random email
def random_email():
    return random_char() + "@gmail.com"
