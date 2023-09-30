import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/esm/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useUser } from "../Components/UserContext";
// Google import start
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import "../styles/pages/register.css";
// Google import stop

function LoginPage() {
  const [submitMsg, setSubmitMsg] = useState("");
  const { setUsername } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
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
    // TRYCODESTART
    if (data && data.name) {
      setSubmitMsg("Login successful!");
      const username = data.name;
      setUsername(username);
      console.log("Logged in", username);
      navigate("/");
    } else {
      setSubmitMsg("Login failed. Please try again.");


      setLoginData(data);
      localStorage.setItem('loginData', JSON.stringify(data));
    };
  };
  // TRYCODESTOP
  // Login handling for google login stop
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  //Google stuff stop

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://127.0.0.1:5000/api/login", formData)
      .then((response) => {
        if (response.status === 201) {
          setSubmitMsg("Login successful!");
          const user = response.data;
          const username = user.username;
          setUsername(username.split("@")[0]);
          console.log("Logged in", username);
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
                    buttonText="Sign up with Google"
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
        {submitMsg && <div style={{ fontSize: "35px" }}>{submitMsg}</div>}
      </div>
    </div>
  );
}

export default LoginPage;
