from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    """Creating database for user"""

    __tablename__ = "rentingUser"
    id = db.Column(db.Intger, primary_key=True)
    username = db.Column(db.String(35), unique=True, nullable=False)
    password = db.Column(db.String())
