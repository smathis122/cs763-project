import React, { useState, useEffect } from "react";
import InputForm from "./AddItem"; // Import the InputForm component

function App() {
  /*
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/data") // Replace with your Flask API endpoint
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
 */
  const handleFormSubmit = (inputValue) => {
    // Send a POST request to your Flask API with inputValue
    fetch("http://127.0.0.1:5000/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: inputValue }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle the API response if needed
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className="App">
      <h1>React Frontend</h1>
      <InputForm onSubmit={handleFormSubmit} />
    </div>
  );
}

export default App;
