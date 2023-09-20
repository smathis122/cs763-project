from flask import Flask, request, jsonify
import os
import urllib.parse as up
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import bcrypt

app = Flask(__name__)

up.uses_netloc.append("postgres")
url = up.urlparse(os.environ["DATABASE_URL"])
conn = psycopg2.connect(database=url.path[1:],
user=url.username,
password=url.password,
host=url.hostname,
port=url.port
)
db = SQLAlchemy()
ma = Marshmallow(app)

#Question for team: Might not be the best idea to create a table here, should need a separate file for that or create it directly in our database
class User(db.Model):
    """Creating database for user"""

    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(35), unique=True, nullable=False)
    emailID = db.Column(db.String(35), unique=True, nullable=False)
    password = db.Column(db.String())
    type = db.Column(db.Integer)



def __init__(self, username, password):
        self.username = username
        self.password = password

class UserSchema(ma.Schema):
    class Meta:
        fields =("id", "username")

user_schema = UserSchema()
multiple_user_schema = UserSchema(many=True)

@app.route('/registerUser', methods=['POST'])
def registerNewUserEmail():
    try: 
        #parse json data
        userData = request.get_json()
        print(userData)
        #defining cursor to postgres data
        cursor = conn.cursor()
        #Hashing the password
        password = userData["password"]
        passwordCrypt = b"{password}"
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(passwordCrypt, salt)

        query_email_exists = "SELECT EXISTS ( SELECT 1 FROM User WHERE user_email = '{emailID}')"#might need AS email_exists after) , need to check
        if  query_email_exists:
        
            insertion_query = "INSERT INTO User (name, emailID, password, type) VALUES (%s, %s, %s, %d)"

            cursor.execute(insertion_query, (userData["name"], userData["emailID"], userData["hashed"], userData["type"]))

            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"message": "Equipment added successfully"}), 201
        print("Email ID already exists in database")
        """
        Need a pop-up here for UI
        """
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    #Main method
    if __name__ == "__main__":
        app.run(debug=True)
