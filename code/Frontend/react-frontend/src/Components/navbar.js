import React from "react";
import { Tabs, Tab, Navbar, Container, Nav } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";
import "../styles/Components/navbar.css";

export function NavbarCustom(props) {
  return (
    <Navbar
      style={{ fontFamily: "blackPearl" }}
      collapseOnSelect
      sticky="top"
      expand="lg"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Brand style={{ fontSize: "35px" }} href="/">
          GearOnTheGo
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="topnav" style={{ fontSize: "35px" }}>
            <Nav.Link href="#/Items">Items</Nav.Link>
            <Nav.Link href="#/reservations">Reservations</Nav.Link>
            <Nav.Link href="#/info">Info</Nav.Link>
            <Nav.Link href="#/contact">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
