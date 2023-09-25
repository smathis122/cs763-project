import React, { useState } from "react";
import { NavbarCustom } from "../Components/navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
function ReservationForm() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the formData as JSON to your Flask back-end here
    fetch("http://127.0.0.1:5000/api/makeReservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
    setSubmitMsg("Loading...");
    setTimeout(() => setSubmitMsg("Your reservation has been made!"), 3000);
    setFormData({
        name: "",
        address: "",
        email: "",
        description: "",
        startDate: "",
        endDate: "",
    });
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="contact-form" onSubmit={handleSubmit}>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text" // Use "text" for a text input field
              placeholder="Enter Name for User"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text" // Use "text" for a text input field
              placeholder="Enter Address of User"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text" // Use "number" for numeric input
              placeholder="Enter Email for User"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea" // Use "textarea" for multi-line text input
              placeholder="Enter Description"
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Rental Start Date</Form.Label>
            <Form.Control
              type="date" // Use "text" for a text input field
              placeholder="Enter Date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Rental End Date</Form.Label>
            <Form.Control
              type="date" // Use "text" for a text input field
              placeholder="Enter Date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <Button
            variant="primary"
            type="submit"
            style={{
              fontSize: "20px",
              width: "150px",
              marginLeft: "15px",
              marginBottom: "25px",
            }}
            id="submitButton"
          >
            Submit
          </Button>
        </Form>
        {submitMsg && <div style={{ fontSize: "35px" }}>{submitMsg}</div>}
      </div>
    </div>
  );
}

export default ReservationForm;
