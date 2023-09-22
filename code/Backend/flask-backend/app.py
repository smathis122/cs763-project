from flask import Flask, request, jsonify
import psycopg2  # or SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)

CORS(app)  # Allow all origins for development; restrict in production

# PostgreSQL connection settings
db_connection_settings = {
    "dbname": "fcfcgjwl",
    "user": "fcfcgjwl",
    "password": "Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r",
    "host": "bubble.db.elephantsql.com",
    "port": "5432",
}

@app.route("/api/getEquipment", methods=["GET"])
def get_equipment():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        # Execute an SQL query to fetch equipment data
        cursor.execute("SELECT * FROM Equipment")  # Modify this query as needed

        # Fetch all rows and store them in a list of dictionaries
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
        # Parse JSON data from the request
        data = request.get_json()
        print(data)
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        # Insert data into the "Equipment" table (modify SQL statement to match your table schema)
        insert_sql = "INSERT INTO Equipment (name, description, status, price, owner) VALUES (%s, %s, %s, %s, %s)"

        cursor.execute(insert_sql, (data["name"], data["description"], data["status"], data["price"], data["owner"]))
        
        conn.commit()
        cursor.close()
        conn.close()

        return jsonify({"message": "Equipment added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
