import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
function RegisterPage() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    setSubmitMsg("Registering...");
    // const csrfToken = 'IjE3NDRiYzhhODAyNzk4YWRiMmY4ZTkzZWRjMmVjNGVhYTAwZDE5MDgi.ZREz5A.-U1U9_3qPQnG52YRuSHSPnUk-kQ';
    // Send the formData as JSON to your Flask back-end here
    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if(!response.ok) {
          return response.json().then((data) => {
            // Handle validation errors
            setErrors(data.errors || {});
            setSubmitMsg("Failed to register");
          });
        }
        else {
          return response.json().then((data) => {
            // Display the success message to the user
            console.log(data.message); // This will log "User added successfully"
            setSubmitMsg(data.message); // Set the message in your component state
          });
        }
        // return response.json();
      })
      .then((data) => {
        // const csrfToken = data.csrf_token;
        console.log(data)
      })
      .catch((error) => console.error("Error:", error));
    // setTimeout(() => setSubmitMsg("You have registered!"), 2000);
    setFormData({
      email: "",
      password: "",
    });
  };

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

export default RegisterPage;
