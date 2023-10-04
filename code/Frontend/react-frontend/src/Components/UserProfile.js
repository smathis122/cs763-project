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

// ... (previous imports)

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
    fetchEquipmentData();
    fetchReviewsData();
  }, [usernameSelected]);

  const fetchEquipmentData = () => {
    fetch(`http://127.0.0.1:5000/api/items/${usernameSelected}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched equipment data:", data); // Debug statement
        setEquipmentData(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchReviewsData = () => {
    fetch(`http://127.0.0.1:5000/api/getReviews/${usernameSelected}`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error:", error));
  };

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
      rating: parseInt(formReviewData.rating), // Convert to an integer
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
        if (data.message === "Review added successfully") {
          // Review was added successfully, fetch reviews data to update the UI
          fetchReviewsData();
        } else {
          // Handle other responses or errors as needed
        }
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
            <Button variant="primary" onClick={() => setShowReviewModal(true)}>
              Write Review
            </Button>
            <Row>
              {equipmentData &&
              equipmentData.items &&
              equipmentData.items.length > 0 ? (
                equipmentData.items.map(
                  (equipment) =>
                    equipment.owner === usernameSelected && ( // Filter items for the selected user
                      <Col key={equipment.id} xs={12} sm={6} md={6} lg={6}>
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
                    )
                )
              ) : (
                <p>{usernameSelected} has no equipment items hosted.</p>
              )}
            </Row>
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
                as="select" // Use a <select> element for the dropdown
                name="rating"
                value={formReviewData.rating}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Control>
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
