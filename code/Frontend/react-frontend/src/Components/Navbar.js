import React from "react";
import {
  Tabs,
  Tab,
  Navbar,
  Container,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";
import "../styles/Components/navbar.css";
import { useUser } from "./UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function NavbarCustom(props) {
  const { username, setUsername } = useUser();
  const navigate = useNavigate(); // Get the navigate function

  const handleLogout = () => {
    // Perform logout logic here
    fetch("http://127.0.0.1:5000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // Successful logout, you can redirect or show a confirmation message
          setUsername(null);
          console.log("Logout successful.");
        } else {
          // Handle errors or display an error message
          console.error("Logout failed.");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    // Navigate to the login page
    navigate("/login");
  };

  // const handleLogout = async () => {
  //   try {
  //     // fetch("http://127.0.0.1:5000/api/logout", {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //   },
  //     // })
  //     const response = await axios.post('/api/logout');
  //     console.log(response.data.message); // Optional: Display logout message
  //   } catch (error) {
  //     console.error('Error logging out:', error);
  //   }
  // }

  return (
    <Navbar
      collapseOnSelect
      sticky="top"
      expand="lg"
      style={{ backgroundColor: "#434F43" }}
    >
      <Container>
        <Navbar.Brand style={{ fontSize: "35px" }} href="#/">
          GearOnTheGo
        </Navbar.Brand>
        <p
          id="welcomeMessage"
          style={{ fontSize: "18px", margin: "0", color: "white" }}
        >
          Welcome, {username || "Guest"}!
        </p>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="topnav" style={{ fontSize: "18px" }}>
            <Nav.Link href="#/contact">Contact</Nav.Link>

            <NavDropdown title="Account" id="collapsible-nav-dropdown">
              {username ? (
                <>
                  <NavDropdown.Item href="#/View">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="#/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="#/register">
                    Register
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            <Nav.Link href="#/info">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
