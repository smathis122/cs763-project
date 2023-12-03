import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import { Modal, Button } from "react-bootstrap";
import "../styles/pages/password.css";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/register.css";
import "../styles/Components/popup.css";
import GoogleLoginButton from "../Components/GoogleLoginButton";
// Google import stop
import axios from "axios";
import { useUser } from "../Components/UserContext";

//This funtion manages various states for form data, user type, form validation errors, and whether to show or hide a password.
function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [buttonPopup, setButtonPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const showPopup = () => {
    setButtonPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/api/reset/${formData.email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            console.log("reset failed");
            window.alert("Failed to Send Link");
            console.log(response);
          });
        } else {
          return response.json().then((data) => {
            console.log(data);
            // Automatically log in the user after registration
            const loginData = {
              email: formData.email,
            };

            setFormData({
              email: "",
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  //This component is rendering a registration form for both native username and password login, and google login authentication
  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleSubmit}>
          <h3 style={{ marginLeft: "35%", marginBottom: "10%" }}>
            Reset Password
          </h3>
          <FormGroup className="contact-page-form-group">
            <Form.Control
              type="email"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <Button
            className="FormButton"
            variant="success"
            type="submit"
            id="submitButton"
          >
            Send Link
          </Button>
          <p className="dont-have-account">
            Remember Password? <Link to="/login">Login</Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
export default RegisterPage;
