from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import psycopg2

from dotenv import load_dotenv

import os

app = Flask(__name__)
load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.secret_key = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)

#database table for payments

class paymentInfo(db.Model):
    payment_id = db.Column(db.Integer,primary_key = True)
    itemid = db.Column(db.Integer, nullable = False)
    is_paid = db.Column(db.Boolean, nullable = False)
    Price = db.Column(db.Integer, nullable = False)

@app.route("/")         
def home():
    return render_template("")

#configuration parameters
conf= {
    "FLASK_PORT" : 5014,
    "FLASK_SECRET" : "SECRET1234"
}


#Main method
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=conf.get("FLASK_PORT"), debug=True)


