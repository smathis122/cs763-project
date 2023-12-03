import React, { useState } from "react";
import axios from "axios";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import { Button } from "react-bootstrap";
import "../styles/pages/password.css";
import { useNavigate } from "react-router-dom";
import "../styles/pages/register.css";
import "../styles/Components/popup.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //This function is used to toggle the visibility of a password.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleReset = () => {
    const urlParams = new URLSearchParams(window.location.hash.slice(1));
    console.log(urlParams);
    const tokenParam = urlParams.get("/newPassword?token");
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
          alert("Invalid or Expired Token!");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("Invalid or Expired Token!");
      });
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleReset}>
          <h3 style={{ marginLeft: "35%", marginBottom: "10%" }}>
            Reset Password
          </h3>
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
            onClick={handleReset}
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
