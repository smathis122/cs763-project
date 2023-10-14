import React, { useState } from "react";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

// Google import start
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "../styles/pages/register.css";
// Google import stop

export function GoogleLoginButton(props) {
  const [submitMsg, setSubmitMsg] = React.useState("");
  const navigate = useNavigate();
  const { setUsername } = useUser();

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  // Failure handling for google login start
  const handleFailure = (result) => {
    alert(JSON.stringify.result);
  };
  // Failure handling for google login stop
  // Login handling for google login start
  const handleLogin = async (googleData) => {
    var url = "http://127.0.0.1:5000/api/register-google";
    if (props.redirectOnLogin) url = "http://127.0.0.1:5000/api/login-google";

    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        googleData: googleData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok && data && data.name && data.email) { 
      const username = data.email; 
      props.handleMessage(username);
      console.log("Logged in", username)
    

      setUsername(username);
      localStorage.setItem("loginData", JSON.stringify(data));
    } else {
      props.handleMessage("Google login failed. Please register.");
    }

    if (res.ok && (props.redirectOnLogin || !data.isNew)) navigate("/");
  };
  return (
    <div className="App">
      <div className="GoogleLoginDiv">
          <div className="GoogleLogin">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              id={"google-login-auth"}
            >
              <GoogleLogin
                id="google-login-button"
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                buttonText="Sign up with Google"
                onSuccess={handleLogin}
                onFailure={handleFailure}
                cookiePolicy={"single_host_origin"}
              ></GoogleLogin>
            </GoogleOAuthProvider>
          </div>
      </div>
    </div>
  );
}

export default GoogleLoginButton;
