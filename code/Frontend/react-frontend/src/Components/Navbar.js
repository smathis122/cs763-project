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

export function NavbarCustom(props) {
  const { username } = useUser();

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
                  <NavDropdown.Item href="#/logout">Logout</NavDropdown.Item>
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
