from flask import Flask, request, jsonify
import psycopg2  # or SQLAlchemy
from flask_cors import CORS
app = Flask(__name__)
# <<<<<<< HEAD

CORS(app)  # Allow all origins for development; restrict in production

# PostgreSQL connection settings
db_connection_settings = {
    "dbname": "fcfcgjwl",
    "user": "fcfcgjwl",
    "password": "Eb5MNeBN-fJlmTipRgqaC-c0tzO3gM5r",
    "host": "bubble.db.elephantsql.com",
    "port": "5432",
}

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
