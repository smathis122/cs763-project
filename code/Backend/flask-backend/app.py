from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow all origins for development; restrict in production

# Sample data
items = [
    {"id": 1, "name": "Item 1"},
    {"id": 2, "name": "Item 2"},
    {"id": 3, "name": "Item 3"},
]

@app.route("/api/save", methods=["POST"])
def save_data():
    try:
        data = request.json.get("data")
        # Process and save the data as needed
        # ...
        return jsonify({"message": "Data saved successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/data')
def get_data():
    return jsonify(items)

if __name__ == '__main__':
    app.run()
