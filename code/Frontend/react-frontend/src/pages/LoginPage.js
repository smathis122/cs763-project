import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../Components/UserContext";
function LoginPage() {
  const [submitMsg, setSubmitMsg] = useState("");
  const { setUsername } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:5000/api/login", formData)
      .then((response) => {
        if (response.status === 201) {
          setSubmitMsg("Login successful!");
          const user = response.data;
          const username = user.username;
          // Store the username in state
          setUsername(username.split("@")[0]);
          console.log("Logged in", username);

          // Navigate to the dashboard page
          navigate("/");
        } else {
          setSubmitMsg("Login failed. Please try again.");
        }
      })
      .catch((error) => {
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
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
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
          <div className="error-messages">
            {errors.email && <p>{errors.email.join(', ')}</p>}
            {errors.password && <p>{errors.password.join(', ')}</p>}
            {/* Display other validation errors as needed */}
          </div>
        </Form>
        {submitMsg && <div style={{ fontSize: "35px" }}>{submitMsg}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
