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
import UserTypePopUp from "../Components/UserTypePopUp";

function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const showPopup = () => {
    setButtonPopup(true);
  };

  //Adding Google Pop up constants (stop)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showError = () => {
    setShowErrorModal(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log(response);
          navigate("/login");
        } else if (response.status === 400) {
          console.log("registration failed");
          console.log(response);
          showError();
        }
      })
      .catch((error) => console.error("Error:", error));
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleSubmit}>
          <h3 style={{ marginLeft: "35%", marginBottom: "10%" }}>Welcome!</h3>
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
          <FormGroup className="contact-page-form-group">
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <span
                className={`password-toggle ${showPassword ? "visible" : ""}`}
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </span>
            </div>
          </FormGroup>
          <Button
            className="FormButton"
            variant="success"
            type="submit"
            id="submitButton"
          >
            Register
          </Button>
          <GoogleLoginButton
            redirectOnLogin={false}
            handleMessage={() => {}}
            setUserEmail={(email) => {
              setUserEmail(email);
            }}
            showPopup={showPopup}
          />
          <UserTypePopUp
            trigger={buttonPopup}
            updatePopup={(value) => {
              setButtonPopup(value);
            }}
            email={userEmail}
          />
          <p className="dont-have-account">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
        <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Password must be between 8 and 20 characters long.
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowErrorModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
export default RegisterPage;
