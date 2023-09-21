from flask import Flask, render_template, request, redirect, url_for, session, flash
import psycopg2
import os
from __init__ import create_app
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = create_app()
# app.secret_key = 'secret123'  # Set a secret key for session management
app.secret_key = os.environ.get('SECRET_KEY')

# PostgreSQL database URL (replace with your ElephantSQL database URL)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')

db = SQLAlchemy(app)

# Define the User model (from models.py)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)

# Function to create the table
def create_user_table():
    with app.app_context():
        db.create_all()

# Check if the table exists and create it if not
# if not db.engine.dialect.has_table(db.engine, 'users'):
create_user_table()

# with app.app_context():
#     user = User(email='user@example.com', password='password123')
#     db.session.add(user)
#     db.session.commit()

# with app.app_context():
#     db.session.query(User).delete()
#     db.session.commit()




# @app.route('/')
# def index():
#     return render_template('login.html')

# @app.route('/login', methods=['POST'])
# def login():
#     email = request.form.get('email')
#     password = request.form.get('password')

#     # Connect to the PostgreSQL database
#     conn = connect_db()
#     cursor = conn.cursor()

#     # Retrieve user information from the database
#     cursor.execute('SELECT * FROM users WHERE email = %s AND password = %s', (email, password))
#     user = cursor.fetchone()

#     if user:
#         session['logged_in'] = True
#         flash('Login successful!', 'success')
#         return redirect(url_for('dashboard'))
#     else:
#         flash('Login failed. Please try again.', 'danger')
#         return redirect(url_for('index'))

# @app.route('/dashboard')
# def dashboard():
#     if session.get('logged_in'):
#         return 'Welcome to the dashboard!'
#     else:
#         return redirect(url_for('index'))

# @app.route('/logout')
# def logout():
#     session.pop('logged_in', None)
#     flash('Logged out successfully.', 'info')
#     return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=False)