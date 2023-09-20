from flask import Flask, request, jsonify
import os
import urllib.parse as up
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import bcrypt

app = Flask(__name__)

up.uses_netloc.append("postgres")
url = up.urlparse(os.environ["DATABASE_URL"])
conn = psycopg2.connect(database=url.path[1:],
user=url.username,
password=url.password,
host=url.hostname,
port=url.port
)
db = SQLAlchemy()
ma = Marshmallow(app)

class User(db.Model):
    """Creating database for user"""

    __tablename__ = "rentingUser"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(35), unique=True, nullable=False)
    password = db.Column(db.String())
#Hashing the password
    passwordCrypt = b"{password}"
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(passwordCrypt, salt)


def __init__(self, username, password):
        self.username = username
        self.password = password

class UserSchema(ma.Schema):
    class Meta:
        fields =("id", "username")

user_schema = UserSchema()
multiple_user_schema = UserSchema(many=True)

@app.route('/registerUser', methods=['POST'])
def registerNewUserEmail(self, emailID, password):
    """
    Adding pseudo code here which will be programmed once @Laz can set up 
    postgres database with @Saahil
    try:
        existing_user = is_email_id_in_database

        if existing_user:
            return "The email, ID already exists in our system please continue to log in"
        db.add(emailId, password, maybe a unique key (primary key))
    Exception exception as e
        print e
        raise e
    """
