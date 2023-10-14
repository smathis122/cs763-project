import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import "../styles/pages/password.css";
// Google import start
import "../styles/pages/register.css";
import "../styles/Components/popup.css";
import GoogleLoginButton from "../Components/GoogleLoginButton";
import UserTypePopUp from "../Components/UserTypePopUp";
// Google import stop

//This funtion manages various states for form data, user type, form validation errors, and whether to show or hide a password.
function RegisterPage() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    user_type: "",
  });

  const [userType, setUserType] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [buttonPopup, setButtonPopup] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const showPopup = () => {
    setButtonPopup(true);
  }

  //Adding Google Pop up constants (stop)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "user_type") {
      setUserType(value); // Update the userType state
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //This function is used to toggle the visibility of a password. 
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //This function is used to submit a form, and Sends a Post request to the server for user registration
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setSubmitMsg("Registering...");
    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, user_type: userType }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => {
            setErrors(data.errors || {});
            console.log(data.errors);
            setSubmitMsg("Failed to register");
          });
        } else {
          return response.json().then((data) => {
            console.log(data.message);
            setSubmitMsg(data.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
    setFormData({
      email: "",
      password: "",
    });
  };
//This component is rendering a registration form for both native username and password login, and google login authentication
  return (
    <div>
      <NavbarCustom />
      <h1>Register</h1>
      <div className="form" id="formDiv">
        <Form className="contact-form" onSubmit={handleSubmit}>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Password</Form.Label>
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
          <div className="FormButtonDiv">
            <Button
              className="FormButton"
              variant="primary"
              type="submit"
              id="submitButton"
            >
              Submit
            </Button>
            <div className="error-messages">
              {errors.email && <p>{errors.email.join(", ")}</p>}
              {errors.password && <p>{errors.password.join(", ")}</p>}
            </div>
          </div>
        </Form>
      </div>
      {/* Google Logic start */}
      <GoogleLoginButton redirectOnLogin={false} handleMessage={() => { }} setUserEmail={(email) => {setUserEmail(email)}} showPopup={showPopup}/>
      <UserTypePopUp trigger={buttonPopup} updatePopup={(value) => {setButtonPopup(value)}} email={userEmail} />       
      {/* Google Logic stop */}
      {submitMsg && <div style={{ fontSize: "35px" }}>{submitMsg}</div>}

    </div>
  );
}
export default RegisterPage;
