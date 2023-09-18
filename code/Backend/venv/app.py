from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)


@app.route('/registerUser', methods=['POST'])