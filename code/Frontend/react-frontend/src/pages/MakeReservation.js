import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/esm/Button";
import { useLocation } from "react-router-dom";
import { useUser } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";

function ReservationForm() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const location = useLocation();
  const { username, userType } = useUser();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    start_date: "",
    end_date: "",
    item_id: location.state.selectedItem.itemid,
    user_name: username,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckoutClick = () => {
    navigate("/Checkout", { state: { reservationDetails: formData } });
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
    if (formData.end_date != null && formData.end_date < formData.start_date) {
      setSubmitMsg("End date must be after the start date!");
    } else if (new Date(formData.start_date) < new Date()) {
      setSubmitMsg("start date must be after today!");
    } else {
      setTimeout(() => setSubmitMsg("Your reservation has been made!"), 3000);
      setFormData({
        start_date: "",
        end_date: "",
        item_id: location.state.selectedItem.itemid,
        user_name: username,
      });
    }
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="reservation-form" onSubmit={handleSubmit}>
          <FormGroup className="reservation-page-form-group">
            <Form.Label>Rental Start Date</Form.Label>
            <Form.Control
              type="date"
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
              type="date"
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
            onClick={handleCheckoutClick}
            style={{
              fontSize: "20px",
              width: "150px",
              marginLeft: "15px",
              marginBottom: "25px",
            }}
            id="submitButton"
          >
            Checkout
          </Button>
        </Form>
        {submitMsg && <div style={{ fontSize: "35px" }}>{submitMsg}</div>}
      </div>
    </div>
  );
}

export default ReservationForm;
