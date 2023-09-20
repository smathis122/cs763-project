from flask import Blueprint, render_template, url_for, request, jsonify
# import db_connection_settings
import psycopg2

db_connection_settings = {
    "dbname": "fcfcgjwl",
    "user": "fcfcgjwl",
    "password": "Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r",
    "host": "bubble.db.elephantsql.com",
    "port": "5432",
}

auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/logout')
def logout():
    return "<p>Logout</p>"

@auth.route('/sign-up')
def sign_up():
    try:
        # Parse JSON data from the request
        data = request.get_json()
        print(data)
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        # Insert data into the "User" table (modify SQL statement to match your table schema)
        insert_sql = "INSERT INTO User (firstName, lastName, email, password) VALUES (%s, %s, %s, %s)"

        cursor.execute(insert_sql, (data["firstName"], data["lastName"], data["email"], data["password"]))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "User added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    # return render_template('signup.html')