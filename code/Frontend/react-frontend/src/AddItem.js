import React, { useState } from "react";

function InputForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit function and pass the input value
    onSubmit(inputValue);
    // Clear the input field
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter something..."
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;
