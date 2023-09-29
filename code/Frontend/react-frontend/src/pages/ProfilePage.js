// ProfilePage.js
import React, { useContext } from 'react';
import { useUser } from "../Components/UserContext";
import { NavbarCustom } from "../Components/Navbar";

function ProfilePage() {
  const { username } = useUser();

  return (
    <div>
      <NavbarCustom />
      <h1>Profile Page</h1>
      <p>Welcome, {username}!</p>
      {/* Display the user's profile information */}
    </div>
  );
}

export default ProfilePage;