import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
// Google import start
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import "../styles/pages/register.css";

// Google import stop


function RegisterPage() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //Google stuff start
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );
  // Failure handling for google login start
  const handleFailure = (result) => {
    alert(JSON.stringify.result);
  };
  // Failure handling for google login stop
  // Login handling for google login start
  const handleLogin = async (googleData) => {
    const res = await fetch('http://127.0.0.1:5000/api/register-google', {
      method: 'POST',
      body: JSON.stringify({
        googleData: googleData,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  // Login handling for google login stop
  // const handleGoogleLoginSuccess = (response) => {
  //   const googleId = response.googleId;
  //   const email = response.profileObj.email;
  //   // Send the email and googleId to your backend for registration
  //   fetch('http://127.0.0.1:5000/signin-google', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email, google_id: googleId })
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch(error => console.error('Error:', error));
  // };

  // const handleGoogleLoginFailure = (response) => {
  //   alert('Google login failed');
  // };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  //Google stuff stop
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const csrfToken =
      "IjE3NDRiYzhhODAyNzk4YWRiMmY4ZTkzZWRjMmVjNGVhYTAwZDE5MDgi.ZREz5A.-U1U9_3qPQnG52YRuSHSPnUk-kQ";
    // Send the formData as JSON to your Flask back-end here
    fetch("http://127.0.0.1:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const csrfToken = data.csrf_token;
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
    setSubmitMsg("Registering...");
    setTimeout(() => setSubmitMsg("You have registered!"), 2000);
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
          <div className="FormButtonDiv">
          <Button
            className="FormButton"
            variant="primary"
            type="submit"
            id="submitButton"
          >
            Submit
          </Button>
          </div>

        </Form>
        {/* Google button start */}
        <div className="App">
          <div className="GoogleLoginDiv">
            {loginData ? (
              <div>
                <h3>You logged in as {loginData.name}</h3>
                <button onClick={handleLogout}>Logout</button>
              </div>
            ) : (
              <div className="GoogleLogin">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                    buttonText="Log in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                  ></GoogleLogin>
                </GoogleOAuthProvider>
              </div>
            )}
          </div>
        </div>
        {/* Google button stop */}

      </div>
    </div>
  );
<<<<<<< HEAD

}
export default RegisterPage
=======
}

export default RegisterPage;
>>>>>>> main
