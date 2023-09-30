import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Button from "react-bootstrap/Button";
function ReservationForm() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
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
      start_date: "",
      end_date: "",
    });
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleSubmit}>
          <FormGroup className="reservation-page-form-group">
            <Form.Label>Rental Start Date</Form.Label>
            <Form.Control
              type="date" // Use "text" for a text input field
              placeholder="Enter Date"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="reservation-page-form-group">
            <Form.Label>Rental End Date</Form.Label>
            <Form.Control
              type="date" // Use "text" for a text input field
              placeholder="Enter Date"
              name="end_date"
              value={formData.end_date}
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
