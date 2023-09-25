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

# Fetch all equipment items
@app.route("/api/getAllEquipment", methods=["GET"])
def get_all_equipment():
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        # Fetch all equipment items from the database
        cursor.execute("SELECT * FROM Equipment")
        equipment_data = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(equipment_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/removeEquipment/<int:item_id>", methods=["DELETE"])
def remove_equipment(item_id):
    try:
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        # Remove the equipment item from the database by ID
        cursor.execute("DELETE FROM Equipment WHERE Itemid = %s", (item_id,))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": f"Equipment with ID {item_id} removed successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Update an equipment item by ID
@app.route("/api/updateEquipment/<int:item_id>", methods=["PUT"])
def update_equipment(item_id):
    try:
        data = request.get_json()
        
        conn = psycopg2.connect(**db_connection_settings)
        cursor = conn.cursor()

        # Update the equipment item in the database by ID
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
