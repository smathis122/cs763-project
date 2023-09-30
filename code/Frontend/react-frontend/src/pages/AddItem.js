import React, { useState } from "react";
import { NavbarCustom } from "../Components/Navbar";
import Form from "react-bootstrap/esm/Form";
import FormGroup from "react-bootstrap/esm/FormGroup";
import Button from "react-bootstrap/esm/Button";
import { useUser } from "../Components/UserContext";

function EquipmentForm() {
  let [submitMsg, setSubmitMsg] = React.useState("");
  const { username } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    price: "",
  });

  const handleSubmit = () => {
    const newEquipment = {
      name: formData.name,
      description: formData.description,
      status: formData.status,
      price: formData.price,
      owner: username,
    };

    fetch("http://127.0.0.1:5000/api/addEquipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEquipment),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
    setSubmitMsg("Loading...");
    setTimeout(() => setSubmitMsg("Your Item has been added!"), 2000);
    setFormData({
      name: "",
      description: "",
      status: "",
      price: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <NavbarCustom />
      <div className="form" id="formDiv">
        <Form className="contact-form" onSubmit={handleSubmit}>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name for Item"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Condition</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Condition of Item"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Price for object"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </FormGroup>
          <FormGroup className="contact-page-form-group">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter Description"
              rows={5}
              name="description"
              value={formData.description}
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

export default EquipmentForm;
