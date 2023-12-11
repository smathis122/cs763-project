import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import { Button } from "react-bootstrap";
import "../styles/pages/password.css";
import { Link } from "react-router-dom";
import "../styles/pages/register.css";
import "../styles/Components/popup.css";

//This funtion manages various states for form data, user type, form validation errors, and whether to show or hide a password.
function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
  });

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
            window.alert("Link Sent! Check your inbox");

            setFormData({
              email: "",
            });
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Failed to Send Link");
      });
  };
  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleSubmit}>
          <h3 style={{ marginLeft: "35%", marginBottom: "10%" }}>
            Send Reset Link
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
            onClick={handleSubmit}
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
