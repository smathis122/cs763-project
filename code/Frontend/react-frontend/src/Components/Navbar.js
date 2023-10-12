import React from "react";
import { Tabs, Tab, Navbar, Container, Nav } from "react-bootstrap";
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
      style={{ backgroundColor: "#918C78" }}
    >
      <Container>
        <Navbar.Brand style={{ fontSize: "35px" }} href="#/">
          GearOnTheGo
        </Navbar.Brand>
        <p id="welcomeMessage">Welcome, {username || "Guest"}!</p>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="topnav" style={{ fontSize: "35px" }}>
            <Nav.Link href="#/contact">Contact</Nav.Link>
            <Nav.Link href="#/search" id="searchTab">
              Search
            </Nav.Link>
            <Nav.Link href="#/login" id="loginTab">
              Login
            </Nav.Link>
            <Nav.Link href="#/register">Register</Nav.Link>
            <Nav.Link href="#/View">Profile</Nav.Link>
            <Nav.Link href="#/info">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
