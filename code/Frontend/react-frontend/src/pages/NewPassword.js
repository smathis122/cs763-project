import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import { Modal, Button } from "react-bootstrap";
import "../styles/pages/password.css";
import { useNavigate, Link } from "react-router-dom";
import "../styles/pages/register.css";
import "../styles/Components/popup.css";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const navigate = useNavigate();

  //This function is used to toggle the visibility of a password.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleReset = () => {
    const urlParams = new URLSearchParams(window.location.hash.slice(1));
    console.log(urlParams);
    const tokenParam = urlParams.get("/newPassword?token");
    console.log("Token in handleReset:", tokenParam); // Check if the token is correctly retrieved
    console.log(newPassword);
    axios
      .post("http://127.0.0.1:5000/api/newPassword", {
        token: tokenParam,
        newPassword,
      })
      .then((response) => {
        if (response.status == 201) {
          alert("Password updated successfully!");
          navigate("/login");
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("Password updated unsuccessful");
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          alert("Password not updated 2!");
        } else {
          // Something happened in setting up the request that triggered an error
          console.log("Error", error.message);
          alert("Password not updated 3!");
        }
        console.log(error.config);
        alert("Password not updated 4!");
      });
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleReset}>
          <FormGroup className="contact-page-form-group">
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
