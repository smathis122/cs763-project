import React, { useState } from "react";

function EquipmentForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "",
    price: "",
    user: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the formData as JSON to your Flask back-end here
    fetch("http://127.0.0.1:5000/api/addEquipment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Description:
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Status:
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
        />
      </label>
      <label>
        User:
        <input
          type="text"
          name="owner"
          value={formData.owner}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default EquipmentForm;
