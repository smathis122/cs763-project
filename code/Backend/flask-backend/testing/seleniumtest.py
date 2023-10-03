import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class TestGoogleLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def tearDown(self):
        self.driver.quit()

    def test_google_login(self):
        self.driver.get("http://127.0.0.1:5000/register")

        google_login_button = self.driver.find_element(By.ID,"google-login-button")
        google_login_button.click()

        redirected_url = self.driver.current_url
        self.assertEqual(redirected_url, "http://127.0.0.1:5000/home")


if __name__ == "__main__":
    unittest.main()
