import React, { useState, useEffect } from "react";
import { NavbarCustom } from "../Components/navbar";
import "../styles/pages/home.css";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function EquipmentList() {
  const [equipmentData, setEquipmentData] = useState([]);

  useEffect(() => {
    // Fetch data from your Flask API endpoint
    fetch("http://127.0.0.1:5000/api/getEquipment")
      .then((response) => response.json())
      .then((data) => setEquipmentData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div>
      <NavbarCustom />

      <Container>
        <Row>
          {equipmentData.map((equipment) => (
            <Col key={equipment.id} xs={12} sm={6} md={4} lg={3}>
              <Card>
                <Card.Body>
                  <Card.Title>{equipment.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Status: {equipment.status}
                  </Card.Subtitle>
                  <Card.Text>{equipment.description}</Card.Text>
                  <Card.Text>Price: ${equipment.price}</Card.Text>
                  <Card.Text>Owner: {equipment.owner}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default EquipmentList;
