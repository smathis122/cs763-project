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

# Database table for user
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(20), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)

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

# Logic for logout 
@app.route("/logout")
def logout():
    session.pop("user", None)
    return redirect(url_for("home"))

# Logic for Google login 
@app.route("/google-login")
def googleLogin():
      return oauth.GearToGoApp.authorize_redirect(redirect_uri=url_for("googleCallback", _external=True))

# Logic for Google sign-in 
@app.route("/signin-google")
def googleCallback():
    token = oauth.GearToGoApp.authorize_access_token()
    user_info = token.get('userinfo', None)
    user_email = user_info.email
    #Tech debt to be implemented later
    user_birthday = token.get('birthdate', None)
    session["user"] = token
    #logic to check database for matching email
    if User.query.filter_by(email=user_email).first():
         return redirect(url_for("home"))
    #Logic to add to database
    else:
         new_user = User(email=user_email, password="Google account, password not available")
         db.session.add(new_user)
         db.session.commit()
         return redirect(url_for("home"))



    #Main method
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=appConf.get("FLASK_PORT"), debug=True)

