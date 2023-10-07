from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from oauthlib.oauth2 import WebApplicationClient
from authlib.integrations.flask_client import OAuth 
import requests
import json
import urllib
import urllib.parse as up
from flask import Flask, render_template, url_for, redirect, flash, request, jsonify, session
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, SelectField
from wtforms.validators import InputRequired, Length, ValidationError, Email, DataRequired, EqualTo
import re
import os
import secrets
from dotenv import load_dotenv
import binascii
import bcrypt
import psycopg2
from flask_cors import CORS
from flask_wtf.csrf import generate_csrf
from google.auth import jwt

app = Flask(__name__)
load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.secret_key = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)

# SQL Queries for Search endpounts
SEARCH_QUERY = "SELECT * FROM Equipment WHERE name ILIKE %s OR description ILIKE %s"
AVAILABLE_ITEMS_QUERY = "SELECT * FROM Equipment WHERE available = true"
UNAVAILABLE_ITEMS_QUERY = "SELECT * FROM Equipment WHERE available = false"


# Database table for user
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    password = db.Column(db.String(255), nullable=False)


CORS(app) # Allow all origins for development; restrict in production
secret_key = secrets.token_hex(16)  # Generate a 32-character (16 bytes) random hexadecimal string

app.config['SECRET_KEY'] = secret_key

db_connection_settings = {
    "dbname": "fcfcgjwl",
    "user": "fcfcgjwl",
    "password": "Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r",
    "host": "bubble.db.elephantsql.com",
    "port": "5432",
}

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class paymentInfo(db.Model):
    payment_id = db.Column(db.Integer,primary_key = True)
    itemid = db.Column(db.Integer, nullable = False)
    is_paid = db.Column(db.Boolean, nullable = False)
    Price = db.Column(db.Integer, nullable = False)


class regUser(UserMixin):
    def __init__(self, id, email, password, user_type):
        self.id = id
        self.email = email
        self.password = password
        self.user_type = user_type


class RegisterForm(FlaskForm):
    email = StringField(validators=[
                           InputRequired(), Length(min=4, max=40), Email(), DataRequired()], render_kw={"placeholder": "Email"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})
    
    user_type = SelectField('User Type', choices=[('renter', 'Renter'), ('host', 'Host')],
                           validators=[InputRequired()])

    submit = SubmitField('Register')

    def validate_email(self, email):
        if not re.match(r'^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$', email.data):
            raise ValidationError('Invalid email address.')
        
        conn = psycopg2.connect(**db_connection_settings)
        
        cursor = conn.cursor()
        cursor.execute('SELECT email FROM "user" WHERE email = %s', (email.data,))
        existing_user_email = cursor.fetchone()
        cursor.close()
        conn.close()
        if existing_user_email:
            raise ValidationError('That email already exists. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField(validators=[
                           InputRequired(), Length(min=4, max=40), Email(), DataRequired()], render_kw={"placeholder": "Email"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Login')

    

@app.route("/api/removeEquipment/<int:item_id>", methods=["DELETE"])
def remove_equipment(item_id):
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        cursor.execute("DELETE FROM Equipment WHERE Itemid = %s", (item_id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Equipment with ID {item_id} removed successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/updateEquipment/<int:item_id>", methods=["PUT"])
def update_equipment(item_id):
    try:
        data = request.get_json()
        
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        cursor.execute("""
            UPDATE Equipment
            SET
                Name = %s,
                Description = %s,
                Status = %s,
                Price = %s,
                Owner = %s
            WHERE Itemid = %s
        """, (data["name"], data["description"], data["status"], data["price"], data["owner"], item_id))

        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": f"Equipment with ID {item_id} updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/getEquipment", methods=["GET"])
def get_equipment():
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM Equipment") 

        columns = [desc[0] for desc in cursor.description]
        equipment_data = [dict(zip(columns, row)) for row in cursor.fetchall()]

        cursor.close()
        conn.close()

        return jsonify(equipment_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/addEquipment", methods=["POST"])
def add_equipment():
    try:
        data = request.get_json()

        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        insert_sql = "INSERT INTO Equipment (name, description, status, price, owner, available) VALUES (%s, %s, %s, %s, %s, %s)"

        cursor.execute(insert_sql, (data["name"], data["description"], data["status"], data["price"], data["owner"], 't'))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Equipment added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/getUsers", methods=["GET"])
def get_users():
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        cursor.execute('SELECT email FROM "user"') 
        users = cursor.fetchall()
        
        cursor.close()
        conn.close()

        print(users) 

        return jsonify(users), 200
    except Exception as e:
        print("Error:", str(e)) 
        return jsonify({"error": str(e)}), 500

@app.route("/api/items/<username>")
def user_items(username):
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        user_name = username.split("@")[0]
        # Fetch items associated with the user using their ID
        cursor.execute("SELECT * FROM equipment WHERE owner = %s", (user_name,))
        # Fetch all rows and store them in a list of dictionaries
        columns = [desc[0] for desc in cursor.description]
        equipment_data = [dict(zip(columns, row)) for row in cursor.fetchall()]

        cursor.close()
        conn.close()
        return jsonify({"items": equipment_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@login_manager.user_loader
def load_user(user_id):
    print("User ID:", user_id)
    print(type(user_id))
    conn = psycopg2.connect(**db_connection_settings)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM "user" WHERE id = %s', (user_id,))
    user_info = cursor.fetchone()
    print(user_info)
    cursor.close()
    conn.close()
    user = None
    if user_info:
        db_password = user_info[2][2:].encode('utf-8')
        hashed_db_password = binascii.unhexlify(db_password)
        user = regUser(user_info[0], user_info[1], hashed_db_password)
        print(user)
        app.logger.info(f"Loaded user: {user}")
    return user
    

@app.route('/api/login', methods=['GET', 'POST'])
def login():
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()
        form = LoginForm(meta={'csrf': False})
        session['username'] = None
        if form.validate_on_submit():
            email = form.email.data
            password = form.password.data.encode('utf-8')
            print('Entered pass:', password)
            cursor.execute('SELECT * FROM "user" WHERE email = %s', (email,))
            user_data = cursor.fetchone()
            cursor.close()
            conn.close()
            if user_data:
                db_password = user_data[2][2:]
                print("Hex pass:", db_password)
                hashed_db_password = binascii.unhexlify(db_password)
                print("Unhexed pass:", hashed_db_password)
                if bcrypt.checkpw(password, hashed_db_password):
                    print("password match!")
                    print(user_data[0])
                    print(type(user_data[0]))

                    user = regUser(user_data[0], email, db_password, user_data[3])

                    username = user_data[1]
                    user_type = user_data[3]
                    print(user_type)
                    session['username'] = username
                    login_user(user)
                    return jsonify({"message": "User logged in successfully", "username": username, "user_type": user_type}), 201
                else:
                    print("Wrong pass")
                    return jsonify({"message": "Wrong password"}), 202
            else:
                print("No user found")
                return jsonify({"message": "No user found"}), 203
        else:
            print("Form validation failed")
            errors = form.errors
            print(errors)
            return jsonify({"errors": errors}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return jsonify({"message": "Entered Dashboard"}), 201

@app.route('/api/profile')
@login_required
def profile():
    if current_user.is_authenticated:
        user_id = current_user.id
        username = current_user.email
        return f'User ID: {user_id}, Username: {username}'
    else:
        return 'User not authenticated'


@app.route('/api/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.', 'info')
    #Google logic start
    session.pop("user", None)
    #Google logic stop
    return redirect(url_for('login'))


@app.route('/api/register', methods=['GET', 'POST'])
def register():
    print("in register route")
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()
        form = RegisterForm(meta={'csrf': False})

        if form.validate_on_submit():
            email = form.email.data
            hashed_password = bcrypt.hashpw(
                form.password.data.encode('utf-8'), bcrypt.gensalt())
            user_type = form.user_type.data
            cursor.execute(
                'INSERT INTO "user" (email, password, user_type) VALUES (%s, %s, %s)', (email, hashed_password, user_type))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"message": "User added successfully"}), 201
        else:
            print("Form validation failed")
            errors = form.errors
            print(errors) 
            return jsonify({"errors": errors}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#Google register method start
@app.route('/api/register-google', methods=['POST', 'OPTIONS'])
def googleRegister():
    #GOOGLE ADDITION START
    if (request.method == "OPTIONS"):
        return jsonify({"message": "Success"}), 200
    try:
        # Get data from the frontend request
        data = request.get_json()
        google_data = data["googleData"]
        token = google_data["credential"]

        claims = jwt.decode(token, verify=False)
        user_email = claims["email"]
        user_name = claims["given_name"] + " " + claims["family_name"]
        session["user"] = token

        # Logic to check database for matching email
        if User.query.filter_by(email=user_email).first():
            return jsonify({"message": "User validated successfully", "name": user_name},), 200
        # Logic to add to database
        else:
            new_user = User(email=user_email, password="Google account, password not available")
            db.session.add(new_user)
            db.session.commit()
            return jsonify({"message": "User added successfully", "name": user_name}), 201
    except Exception as e:
        return jsonify({"error": "Error validating user: " + str(e)}), 500
#Google register method end

#Google login method start
@app.route('/api/login-google', methods=['POST', 'OPTIONS'])
def googleLogin():
    if (request.method == "OPTIONS"):
            return jsonify({"message": "Success"}), 200
    try:
        # Get data from the frontend request
        data = request.get_json()
        google_data = data["googleData"]
        token = google_data["credential"]

        claims = jwt.decode(token, verify=False)
        user_email = claims["email"]
        user_name = claims["given_name"] + " " + claims["family_name"]
        session["user"] = token

        # Logic to check database for matching email
        if User.query.filter_by(email=user_email).first():
            return jsonify({"message": "User validated successfully", "name": user_name},), 200
        
        return jsonify({"message": "Please register first", "name": user_name},), 404
    except Exception as e:
        return jsonify({"error": "Error validating user: " + str(e)}), 500

@app.route("/api/makeReservation", methods=["POST"])
def make_reservation():
    try:

        data = request.get_json()
 
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        insert_sql = "INSERT INTO Reservation (start_date, end_date) VALUES (%s, %s)"
        cursor.execute(insert_sql, (data["start_date"], data["end_date"]))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Reservation made successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/getReservation", methods=["GET"])
def get_reservation():
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM Reservation") 

        columns = [desc[0] for desc in cursor.description]
        reservation_data = [dict(zip(columns, row)) for row in cursor.fetchall()]

        cursor.close()
        conn.close()

        return jsonify(reservation_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Define the function to execute SQL queries and fetch data
def execute_database_query(query, params=None):
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()
        if params is not None:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        # Fetch all rows and store them in a list of dictionaries
        columns = [desc[0] for desc in cursor.description]
        data = [dict(zip(columns, row)) for row in cursor.fetchall()]
        cursor.close()
        conn.close()
        return data
    except Exception as e:
        return None, str(e)

@app.route('/api/searchItems', methods=['GET'])
def search_items():
    try:

        search_query = request.args.get('q')
        print(f"Received search query: {search_query}")
        query = "SELECT * FROM Equipment WHERE name ILIKE %s OR description ILIKE %s"
        params = (f"%{search_query}%", f"%{search_query}%")
        equipment_data = execute_database_query(query, params)
        if equipment_data:
            return jsonify(equipment_data), 200
        else:
            return jsonify({"message": "No matching items found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Adding Info Page
@app.route('/api/info')
def info():
    return jsonify({"message": "Entered Info"}), 201
    
@app.route('/api/items', methods=['GET'])
def get_items():
    try:
        availability = request.args.get('availability')
        query = "SELECT * FROM Equipment"
        if availability == "available":
            query += " WHERE available = true"
        elif availability == "unavailable":
            query += " WHERE available = false"
        equipment_data = execute_database_query(query)
        if equipment_data:
            return jsonify(equipment_data), 200
        else:
            return jsonify({"message": f"No {availability} items found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)


