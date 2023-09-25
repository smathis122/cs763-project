from flask import Flask, render_template, url_for, redirect, flash, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin, login_user, LoginManager, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import InputRequired, Length, ValidationError, Email, DataRequired, EqualTo
import re
# from flask_bcrypt import Bcrypt
import os
from dotenv import load_dotenv
import binascii
import bcrypt
import psycopg2
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

db_connection_settings = {
    "dbname": "fcfcgjwl",
    "user": "fcfcgjwl",
    "password": "Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r",
    "host": "bubble.db.elephantsql.com",
    "port": "5432",
}

# conn = psycopg2.connect(DATABASE_URL, sslmode='require')

CORS(app)

# bcrypt = Bcrypt(app)


login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


class User(UserMixin):
    def __init__(self, id, email, password):
        self.id = id
        self.email = email
        self.password = password

# class User(db.Model, UserMixin):
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(20), nullable=False, unique=True)
#     password = db.Column(db.String(200), nullable=False)


class RegisterForm(FlaskForm):
    email = StringField(validators=[
                           InputRequired(), Length(min=4, max=20), Email(), DataRequired()], render_kw={"placeholder": "Email"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Register')

    def validate_email(self, email):
        if not re.match(r'^[a-zA-Z0-9.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$', email.data):
            raise ValidationError('Invalid email address.')
        
        conn = psycopg2.connect(**db_connection_settings)
        
        cursor = conn.cursor()
        cursor.execute('SELECT email FROM "user" WHERE email = %s', (email.data,))
        existing_user_email = cursor.fetchone()
        cursor.close()

        if existing_user_email:
            flash('Email already in use. Please choose another one.', 'danger')
            raise ValidationError('That email already exists. Please choose a different one.')


class LoginForm(FlaskForm):
    email = StringField(validators=[
                           InputRequired(), Length(min=4, max=20), Email(), DataRequired()], render_kw={"placeholder": "Email"})

    password = PasswordField(validators=[
                             InputRequired(), Length(min=8, max=20)], render_kw={"placeholder": "Password"})

    submit = SubmitField('Login')


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    conn = psycopg2.connect(**db_connection_settings)
    form = LoginForm()
    if form.validate_on_submit():
        cursor = conn.cursor()
        email = form.email.data
        password = form.password.data.encode('utf-8')
        cursor.execute('SELECT * FROM "user" WHERE email = %s', (email,))
        user_data = cursor.fetchone()
        cursor.close()

        if user_data:
            db_password = user_data[2:].encode('utf-8')
            hashed_db_password = binascii.unhexlify(db_password)
            if bcrypt.checkpw(password, hashed_db_password):
                user = User(user_data[0], email, db_password)
                login_user(user)
                flash('Login successful!', 'success')
                return redirect(url_for('dashboard'))
            else:
                flash('Login failed. Please try again.', 'danger')
        else:
            flash('Login failed. Please try again.', 'danger')
    return render_template('flasklogin.html', form=form)


@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    return render_template('flaskdashboard.html')


@app.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    flash('Logged out successfully.', 'info')
    return redirect(url_for('login'))


@ app.route('/register', methods=['GET', 'POST'])
def register():
    conn = psycopg2.connect(**db_connection_settings)
    form = RegisterForm()
    if form.validate_on_submit():
        email = form.email.data
        hashed_password = bcrypt.hashpw(
            form.password.data.encode('utf-8'), bcrypt.gensalt())
        cursor = conn.cursor()
        cursor.execute(
            'INSERT INTO "user" (email, password) VALUES (%s, %s)', (email, hashed_password))
        conn.commit()
        cursor.close()
        flash('Sign-up successful! You can now log in.', 'success')
        return redirect(url_for('login'))


if __name__ == "__main__":
    app.run(debug=True)