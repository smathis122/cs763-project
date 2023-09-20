from flask import Flask, request, jsonify
import os
import urllib.parse as up
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import bcrypt
from __init__ import create_app
from flask_login import UserMixin


app = create_app()

db_connection_settings = {
    "dbname": "fcfcgjwl",
    "user": "fcfcgjwl",
    "password": "Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r",
    "host": "bubble.db.elephantsql.com",
    "port": "5432",
}

# conn = psycopg2.connect(**db_connection_settings)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://fcfcgjwl:Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r@bubble.db.elephantsql.com/fcfcgjwl'

# db = SQLAlchemy(app)

# # ma = Marshmallow(app)

# class User(db.Model, UserMixin):
#     """Creating database for user"""

#     __tablename__ = "sampleUser"
#     id = db.Column(db.Integer, primary_key=True)
#     username = db.Column(db.String(20), unique=True, nullable=False)
#     password = db.Column(db.String(80), nullable=False)
# #Hashing the password
#     passwordCrypt = b"{password}"
#     salt = bcrypt.gensalt()
#     hashed = bcrypt.hashpw(passwordCrypt, salt)


if __name__ == "__main__":
    app.run(debug=True)