# import pytest
# import requests
# from app import app, db, User

# invalid_user_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2OTY3MjY0NzMsImV4cCI6MTcyODI2MjQ3MywiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImdpdmVuX25hbWUiOiJUZXN0IiwiZmFtaWx5X25hbWUiOiJVc2VyIiwiZW1haWwiOiJ0ZXN0QGFiYy5jb20ifQ.gl-qcD8US2Ix9DxzPZ9tNGtu8_AnGx9dgnFVY7uF4Hg"

# @pytest.fixture
# def client():
#     app.config['TESTING'] = True
#     client = app.test_client()

#     with app.app_context():
#         db.create_all()

#     yield client


# def test_google_login(client):
#     response = client.options('/api/login-google')
#     assert response.status_code == 200
#     assert response.json == {'message': 'Success'}

# def test_google_login_unregistered_user(client):
#      # Define the data in the POST request
#     data = {
#         "googleData": {
#             "credential": invalid_user_token
#         }
#     }

#     # Send a POST request to the route
#     response = client.post('/api/login-google', json=data)
#     assert response.status_code == 404
#     assert response.json == {'message': 'Success'}
