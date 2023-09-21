# from flask import Flask
# from flask_bcrypt import Bcrypt

# app = Flask(__name__)
# bcrypt = Bcrypt(app)

# # Hashed password retrieved from the database (including "\x" prefix)
# stored_password_hash = "\x2432622431322478534d66614c31643943714d5a73526635423957774f5057785272694a427353667377545a444c4238704941414e57434f66666d32"

# # Password provided by the user during login
# provided_password = "password4"

# pw_hash = bcrypt.generate_password_hash('password4', 10)
# print(pw_hash)
# # Verify the provided password against the stored hash
# if bcrypt.check_password_hash(stored_password_hash, provided_password):
#     print('matched')

# else:
#     print('not matched')

import bcrypt
import binascii

# Example hashed password in hexadecimal format
hex_hashed_password = "2432622431322478534d66614c31643943714d5a73526635423957774f5057785272694a427353667377545a444c4238704941414e57434f66666d32"

# Convert the hexadecimal hash to bytes
hashed_password_bytes = binascii.unhexlify(hex_hashed_password)

# The password to verify
password = "password4"

# Verify the password
if bcrypt.checkpw(password.encode('utf-8'), hashed_password_bytes):
    print("Password is correct")
else:
    print("Password is incorrect")