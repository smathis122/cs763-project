import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../Components/UserContext";
// Google import start
import GoogleLoginButton from "../Components/GoogleLoginButton";
// Google import stop
import "../styles/pages/password.css";

function LoginPage() {
  const [submitMsg, setSubmitMsg] = useState("");
  const { setUsername, setUserType } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitMessageChange = (message) => {
    setSubmitMsg(message);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setSubmitMsg("Logging in...");
    axios
      .post("http://127.0.0.1:5000/api/login", formData)
      .then((response) => {
        if (response.status === 201) {
          // Going here when email right and password right
          setSubmitMsg("Login successful!");
          const user = response.data;
          const username = user.username;
          const userType = user.user_type;
          setUsername(username);
          setUserType(userType);
          console.log("Logged in", username, "as", userType);

          if (userType === "renter") {
            navigate("/"); // Redirect to the home page
          } else if (userType === "host") {
            navigate("/View"); // Redirect to the profile page
          } else {
            // Handle other user types or scenarios
            console.log("Unknown user type");
          }
        } else if (response.status === 202) {
          // Going here when password wrong but email right
          setErrors(response.data || {});
          console.log("Wrong Password");
          console.log(response.data);
          setSubmitMsg("Login failed. Please try again!");
        } else if (response.status === 203) {
          // Going here when user wrong
          setErrors(response.data || {});
          console.log("Wrong User");
          console.log(response.data);
          setSubmitMsg("Login failed. Please try again!");
        }
      })
      .catch((error) => {
        // Going here when email and/or password format wrong
        setErrors(error.response.data.errors || {});
        console.log(errors);
        console.error("Error:", error);
        setSubmitMsg("Login failed. Please try again.");
      });
  };

  return (
    <div>
      <NavbarCustom />
      <h1>Log In</h1>
      <div className="form" id="formDiv">
        <Form className="contact-form" onSubmit={handleSubmit}>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Email</Form.Label>
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
            <Form.Label>Password</Form.Label>
            <div className="password-input-container">
              <Form.Control
                type={showPassword ? "text" : "password"} // Toggle password visibility
                placeholder="Enter Password"
                name="password"
                id="password"
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
            variant="primary"
            type="submit"
            style={{
              fontSize: "20px",
              width: "150px",
              marginLeft: "15px",
              marginBottom: "25px",
            }}
            id="submitButton"
          >
            Submit
          </Button>
          <div className="error-messages" id="error_messages">
            {errors.email && <p>{errors.email.join(", ")}</p>}
            {errors.password && <p>{errors.password.join(", ")}</p>}
            {errors.message && <p>{errors.message}</p>}
            {/* Display other validation errors as needed */}
          </div>
        </Form>
        <GoogleLoginButton redirectOnLogin={true} handleMessage={handleSubmitMessageChange} setUserEmail={() => {}}></GoogleLoginButton>
        {submitMsg && <div style={{ fontSize: "35px" }}>{submitMsg}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
