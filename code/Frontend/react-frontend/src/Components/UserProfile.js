import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavbarCustom } from "./Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useUser } from "./UserContext";

function UserProfile() {
  const { usernameSelected } = useParams();
  const usernameParts = usernameSelected.split("@")[0];
  const { username } = useUser();
  const [equipmentData, setEquipmentData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false); // New state for review modal
  const [reviewText, setReviewText] = useState(""); // State to store review text
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details and items for the specified user using the username
    fetch(`http://127.0.0.1:5000/api/items/${usernameSelected}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Data received from API:", data);
        setEquipmentData(data);
      })
      .catch((error) => console.error("Error:", error));
  }, [username]);

  const handleCardClick = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    // Send the review data to your server
    // You can use fetch or any other method to post the review
    // After posting the review, you can close the modal
    // Example:
    // fetch('your-api-endpoint-for-posting-reviews', {
    //   method: 'POST',
    //   body: JSON.stringify({ text: reviewText, userId: usernameSelected }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    // .then((response) => {
    //   if (response.ok) {
    //     setShowReviewModal(false);
    //     setReviewText(""); // Clear the review text
    //   } else {
    //     // Handle error
    //   }
    // })
    // .catch((error) => console.error("Error:", error));
  };
  console.log("selected" + usernameParts);
  console.log("current" + username);
  if (username === usernameParts) {
    navigate("/View");
  }

  if (!equipmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavbarCustom />

      <Container>
        <h2>Items Hosted by {usernameParts}</h2>
      </Container>
      <Container>
        <Row>
          {equipmentData.items.map((equipment) => (
            <Col key={equipment.itemId} xs={12} sm={6} md={4} lg={3}>
              <Card
                onClick={() => handleCardClick(equipment)}
                style={{ cursor: "pointer" }}
              >
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
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedEquipment?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Status: {selectedEquipment?.status}</p>
          <p>Description: {selectedEquipment?.description}</p>
          <p>Price: ${selectedEquipment?.price}</p>
          <p>Owner: {selectedEquipment?.owner}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => setShowReviewModal(true)}>
            Write Review
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Review Form Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <Form.Group controlId="formReviewText">
              <Form.Label>Review Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UserProfile;
