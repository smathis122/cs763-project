import React from 'react';

class GoogleSignUp extends React.Component {
  handleClick = () => {
    window.location.href = 'http://localhost:5008/google-login'; // Redirect to Flask route
  }

  render() {
    return (
      <div>
        <h1>Google Sign Up</h1>
        <button onClick={this.handleClick}>Sign Up with Google</button>
      </div>
    );
  }
}

export default GoogleSignUp;
