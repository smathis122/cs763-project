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
import FormGroup from "react-bootstrap/esm/FormGroup";

function UserProfile() {
  const { usernameSelected } = useParams();
  const { username } = useUser();
  const [equipmentData, setEquipmentData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [formReviewData, setFormReviewData] = useState({
    title: "",
    description: "",
    rating: "",
  });

  useEffect(() => {
    // Fetch user details, items, and reviews for the specified user using the username
    Promise.all([
      fetch(
        `http://127.0.0.1:5000/api/items/${usernameSelected}`
      ).then((response) => response.json()),
      fetch(
        `http://127.0.0.1:5000/api/getReviews/${usernameSelected}`
      ).then((response) => response.json()),
    ])
      .then(([equipmentResponse, reviewsResponse]) => {
        console.log("Equipment Data received from API:", equipmentResponse);
        console.log("Reviews received from API:", reviewsResponse);

        setEquipmentData(equipmentResponse);
        setReviews(reviewsResponse);
      })
      .catch((error) => console.error("Error:", error));
  }, [usernameSelected]);

  const handleCardClick = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormReviewData({ ...formReviewData, [name]: value });
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const newReview = {
      title: formReviewData.title,
      description: formReviewData.description,
      rating: formReviewData.rating,
      source: username,
      target: usernameSelected,
    };

    fetch("http://127.0.0.1:5000/api/addReviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));

    setShowReviewModal(false);
    setFormReviewData({
      title: "",
      description: "",
      rating: "",
    });
  };

  console.log("selected" + usernameSelected);
  console.log("current" + username);
  if (username === usernameSelected) {
    navigate("/View");
  }

  return (
    <div>
      <NavbarCustom />
      <Container fluid>
        <Row>
          <Col md={8} className="equipment-column">
            <h2>Items Hosted by {usernameSelected}</h2>
            {equipmentData && equipmentData.items.length > 0 ? (
              <div>
                <Button
                  variant="primary"
                  onClick={() => setShowReviewModal(true)}
                >
                  Write Review
                </Button>
                <Row>
                  {equipmentData.items.map((equipment) => (
                    <Col
                      key={equipment.itemId}
                      xs={12}
                      sm={6}
                      md={6}
                      lg={6}
                      className="equipment-card-col"
                    >
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
              </div>
            ) : (
              <p>{usernameSelected} has no equipment items hosted.</p>
            )}
          </Col>
          <Col md={4} className="reviews-column">
            <h2>Reviews for {usernameSelected}</h2>
            {reviews.length === 0 ? (
              <p>This person has no reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <Card key={index} style={{ marginBottom: "10px" }}>
                  <Card.Body>
                    <Card.Title>{review[3]}</Card.Title>
                    <Card.Text>Rating: {review[4]}</Card.Text>
                    <Card.Text>{review[5]}</Card.Text>
                    <Card.Text>By: {review[2]}</Card.Text>
                  </Card.Body>
                </Card>
              ))
            )}
          </Col>
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
        </Modal.Footer>
      </Modal>
      {/* Add a "Write Review" Button */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Write a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleReviewSubmit}>
            <FormGroup className="contact-page-form-group">
              <Form.Label className="form-label">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={formReviewData.title}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <FormGroup className="contact-page-form-group">
              <Form.Label className="form-label">Rating</Form.Label>
              <Form.Control
                type="number"
                placeholder="Rating"
                name="rating"
                value={formReviewData.rating}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            <Form.Group controlId="formReviewText">
              <Form.Label>Review Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="description"
                value={formReviewData.description}
                onChange={handleInputChange}
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
