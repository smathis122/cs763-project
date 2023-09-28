import React, { useState, useEffect } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function AllItemsPage() {
  const [equipmentData, setEquipmentData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    id: null,
    name: "",
    description: "",
    status: "",
    price: "",
    owner: "",
  });

  useEffect(() => {
    fetchEquipmentData();
  }, []);

  const fetchEquipmentData = () => {
    // Fetch equipment data from your Flask API endpoint
    fetch("http://127.0.0.1:5000/api/getEquipment")
      .then((response) => response.json())
      .then((data) => setEquipmentData(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleRemoveClick = (event, equipment) => {
    event.stopPropagation();
    setSelectedItem(equipment);
    setShowRemoveModal(true);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  // Function to remove the selected item
  const handleRemoveConfirm = () => {
    if (!selectedItem) {
      // Handle the case where no item is selected
      console.error("No item selected for removal.");
      return;
    }
    console.log("Selected Item:", selectedItem);

    // Send a DELETE request to remove the selected item from the database
    fetch(`http://127.0.0.1:5000/api/removeEquipment/${selectedItem.itemid}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the list of items
        fetchEquipmentData();
        setShowRemoveModal(false);
        // Clear the selected item after removal
        setSelectedItem(null);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateClick = (event, equipment) => {
    event.stopPropagation();
    setSelectedItem(equipment);
    setUpdateFormData({
      id: equipment.itemid, // Make sure 'id' matches the property name in your equipment object
      name: equipment.name,
      description: equipment.description,
      status: equipment.status,
      price: equipment.price,
      owner: equipment.owner,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    console.log(updateFormData);
    // Send a PUT request to update the item's details in the database
    fetch(`http://127.0.0.1:5000/api/updateEquipment/${updateFormData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh the list of items
        fetchEquipmentData();
        setShowUpdateModal(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleCardClick = (equipment) => {
    setSelectedEquipment(equipment);
    setShowModal(true);
  };

  return (
    <div>
      <NavbarCustom />
      <Container>
        <Row>
          {equipmentData.map((equipment) => (
            <Col key={equipment.id} xs={12} sm={6} md={4} lg={3}>
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
                  <Button
                    variant="danger"
                    onClick={(e) => handleRemoveClick(e, equipment)}
                  >
                    Remove
                  </Button>
                  <Button
                    variant="primary"
                    onClick={(e) => handleUpdateClick(e, equipment)}
                  >
                    Update
                  </Button>
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
        </Modal.Footer>
      </Modal>

      <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
        {/* Remove confirmation modal */}
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {selectedItem?.name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleRemoveConfirm}>
            Remove
          </Button>
          <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        {/* Update item modal */}
        <Modal.Header closeButton>
          <Modal.Title>Edit Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={updateFormData.name}
                onChange={(e) =>
                  setUpdateFormData({ ...updateFormData, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={updateFormData.description}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={updateFormData.status}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    status: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={updateFormData.price}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    price: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group controlId="formOwner">
              <Form.Label>Owner</Form.Label>
              <Form.Control
                type="text"
                name="owner"
                value={updateFormData.owner}
                onChange={(e) =>
                  setUpdateFormData({
                    ...updateFormData,
                    owner: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AllItemsPage;
