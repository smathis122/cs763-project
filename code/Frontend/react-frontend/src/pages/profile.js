import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavbarCustom } from "../Components/Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import { useUser } from "../Components/UserContext";

function UserDataList() {
  const [userData, setUserData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const { username } = useUser();
  console.log(username);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    // Fetch user data from your Flask API endpoint
    fetch("http://127.0.0.1:5000/api/getUsers")
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div>
      <NavbarCustom />

      <Container>
        <Row>
          {userData.map((user, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Link to={`user/${user}`} style={{ textDecoration: "none" }}>
                <Card
                  onClick={() => handleCardClick(user)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <Card.Title>{user}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default UserDataList;
