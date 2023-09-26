import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarCustom from "../Components/navbar";

function ItemSearchAndFilter() {
    const [searchQuery, setSearchQuery] = useState("");
    const [availabilityFilter, setAvailabilityFilter] = useState("searchItems");
    const [results, setResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
  
    useEffect(() => {
      // Fetch initial data when the component mounts
      fetchItems();
    }, []);
  
    const fetchItems = () => {
      // Make an AJAX request to your backend API
      const endpoint =
        availabilityFilter === "searchItems"
          ? `http://127.0.0.1:5000/api/searchItems?q=${searchQuery}`
          : `http://127.0.0.1:5000/api/${availabilityFilter}`;
  
      fetch(endpoint)
        .then(handleResponse)
        .catch(handleError);
    };
  
    const handleResponse = (response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      response.json()
        .then((data) => {
          setResults(data);
        })
        .catch(handleError);
    };
  
    const handleError = (error) => {
      console.error("Error:", error);
      setResults([{ message: "An error occurred while fetching data." }]);
    };
  
    const handleCardClick = (item) => {
      setSelectedItem(item);
      setShowModal(true);
    };
  
    return (
      <div>
        <NavbarCustom />
  
        <Container>  
          {/* Search input */}
          <input
            type="text"
            id="searchInput"
            placeholder="Search by name or description"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button onClick={fetchItems}>Search</Button>
  
          {/* Filter Options */}
          <h2>Filter by Availability Status:</h2>
          <label>
            <input
              type="radio"
              name="availabilityFilter"
              value="searchItems"
              checked={availabilityFilter === "searchItems"}
              onChange={() => setAvailabilityFilter("searchItems")}
            />{" "}
            All
          </label>
          <label>
            <input
              type="radio"
              name="availabilityFilter"
              value="availableItems"
              checked={availabilityFilter === "availableItems"}
              onChange={() => setAvailabilityFilter("availableItems")}
            />{" "}
            Available
          </label>
          <label>
            <input
              type="radio"
              name="availabilityFilter"
              value="unavailableItems"
              checked={availabilityFilter === "unavailableItems"}
              onChange={() => setAvailabilityFilter("unavailableItems")}
            />{" "}
            Unavailable
          </label>
  
          {/* Display Results */}
          <div id="results">
  {results.map((item) => (
    <Card
      key={item.id}
      style={{ cursor: "pointer" }}
      onClick={() => handleCardClick(item)}
    >
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Status: {item.available ? "Available" : "Unavailable"}
        </Card.Subtitle>
        <Card.Text>{item.description}</Card.Text>
        <Card.Text>Price: ${item.price}</Card.Text>
        <Card.Text>Owner: {item.owner}</Card.Text>
      </Card.Body>
    </Card>
  ))}
</div>
  
          {/* Modal for displaying details */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedItem?.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Status: {selectedItem?.available ? "Available" : "Unavailable"}</p>
              <p>Description: {selectedItem?.description}</p>
              <p>Price: {selectedItem?.price}</p>
              <p>Owner: {selectedItem?.owner}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    );
  }
  
  export default ItemSearchAndFilter;