// ProfilePage.js
import React, { useContext } from 'react';
import { useUser } from "../Components/UserContext";
import { NavbarCustom } from "../Components/Navbar";

function ProfilePage() {
  const { username, userType } = useUser();

  if (userType == "renter") {
    return (
        <div>
          <NavbarCustom />
          <h1>Profile Page</h1>
          <p>Welcome, {username}!</p>
          <p>You are a renter!</p>
          {/* Display the user's profile information */}
        </div>
      );
  } else if (userType == "host") {
    return (
        <div>
          <NavbarCustom />
          <h1>Profile Page</h1>
          <p>Welcome, {username}!</p>
          <p>You are a host!</p>
          {/* Display the user's profile information */}
        </div>
      );
  } else {
    return (
        <div>
          <NavbarCustom />
          <h1>Profile Page</h1>
          <p>Welcome, {username}!</p>
          <p>I don't know what you are!</p>
          {/* Display the user's profile information */}
        </div>
      );
  }

}

export default ProfilePage;