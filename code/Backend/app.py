#Getting Libraries
from flask import Flask, request, jsonify, url_for, session, redirect, render_template
import os
import urllib.parse as up
import psycopg2
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import bcrypt
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from oauthlib.oauth2 import WebApplicationClient
from authlib.integrations.flask_client import OAuth 
import requests
import json
import urllib
from dotenv import load_dotenv

app = Flask(__name__)

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.secret_key = os.environ.get('SECRET_KEY')

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

# up.uses_netloc.append("postgres")
# url = up.urlparse(os.environ["DATABASE_URL"])
# conn = psycopg2.connect(database=url.path[1:],
# user=url.username,
# password=url.password,
# host=url.hostname,
# port=url.port
# )
# db = SQLAlchemy()
# ma = Marshmallow(app)

# #Question for team: Might not be the best idea to create a table here, should need a separate file for that or create it directly in our database
# class User(db.Model):
#     """Creating database for user"""

#     __tablename__ = "User"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(35), unique=True, nullable=False)
#     emailID = db.Column(db.String(35), unique=True, nullable=False)
#     password = db.Column(db.String())
#     type = db.Column(db.Integer)



# def __init__(self, username, password):
#         self.username = username
#         self.password = password

# class UserSchema(ma.Schema):
#     class Meta:
#         fields =("id", "username")

# user_schema = UserSchema()
# multiple_user_schema = UserSchema(many=True)

# @app.route('/registerUser', methods=['POST'])
# def registerNewUserEmail():
#     try: 
#         #parse json data
#         userData = request.get_json()
#         print(userData)
#         #defining cursor to postgres data
#         cursor = conn.cursor()
#         #Hashing the password
#         password = userData["password"]
#         passwordCrypt = b"{password}"
#         salt = bcrypt.gensalt()
#         hashed = bcrypt.hashpw(passwordCrypt, salt)

#         query_email_exists = "SELECT EXISTS ( SELECT 1 FROM User WHERE user_email = '{emailID}')"#might need AS email_exists after) , need to check
#         if  query_email_exists:
        
#             insertion_query = "INSERT INTO User (name, emailID, password, type) VALUES (%s, %s, %s, %d)"

#             cursor.execute(insertion_query, (userData["name"], userData["emailID"], userData["hashed"], userData["type"]))

#             conn.commit()
#             cursor.close()
#             conn.close()
#             return jsonify({"message": "Equipment added successfully"}), 201
#         print("Email ID already exists in database")
"""
Need a pop-up here for UI
"""
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 500
#Configuration
#Application Configuration for Client ID, Client Secret, URL, and Flask Secret, testing on a local port.
appConf = {
    "OAUTH_CLIENT_ID" : "95479501580-7om6n792bbd8em6l76a2sf14a8dg2h80.apps.googleusercontent.com",
    "OAUTH_CLIENT_SECRET" : "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",
    "OAUTH_META_URL" : "https://accounts.google.com/.well-known/openid-configuration",
    "FLASK_SECRET" : "77c7e3f1-0128-4408-9081-0e014e8bcabf",
    "FLASK_PORT" : 5008
    }   
oauth = OAuth(app)

#Adding Secret Key
app.secret_key = appConf.get("FLASK_SECRET")

oauth.register("GearToGoApp",
               client_id = appConf.get("OAUTH_CLIENT_ID"),
               client_secret = appConf.get("OAUTH_CLIENT_SECRET"),
               server_metadata_url=appConf.get("OAUTH_META_URL"),
               client_kwargs = {
                     "scope":"openid profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read",
               }
               )


#Replace port with hosted website on Netlife
#Testing locally (Delete Later)
@app.route("/")         
def home():
        return render_template("home.html", session=session.get("user"),
                               pretty=json.dumps(session.get("user"), indent=4))

@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("home"))

@app.route("/google-login")
def googleLogin():
      return oauth.GearToGoApp.authorize_redirect(redirect_uri=url_for("googleCallback", _external=True))

@app.route("/signin-google")
def googleCallback():
    token = oauth.GearToGoApp.authorize_access_token()
    user_info = token.get('userinfo', None)
    user_email = user_info.email
    user_birthday = token.get('birthdate', None)
    print(user_email)
    session["user"] = token
    if User.query.filter_by(email=user_email).first():
         return redirect(url_for("home"))
    else:
         new_user = User(email=user_email, password="Google account, password not available")
         db.session.add(new_user)
         db.session.commit()
         return redirect(url_for("home"))



    #Main method
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=appConf.get("FLASK_PORT"), debug=True)

