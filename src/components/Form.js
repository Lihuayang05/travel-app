import React, { useState } from "react";

export default function Form({ addItem }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [category, setCategory] = useState("Toiletries"); // Add state for category

    const handleInputChange = (e) => {
      setDescription(e.target.value);
    };
  
    const handleQuantityChange = (e) => {
      setQuantity(Number(e.target.value));
    };

    const handleCategoryChange = (e) => {
      setCategory(e.target.value); // Handle category change
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (description.trim()) {
        // Add category when adding a new item
        addItem({ description, quantity, category });
        setDescription("");
        setQuantity(1);
        setCategory("Toiletries"); // Reset category after adding item
      }
    };
  
    return (
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>What do you need to pack?</h3>

        {/* Category dropdown */}
        <select value={category} onChange={handleCategoryChange}>
          <option value="Toiletries">Toiletries</option>
          <option value="Clothing">Clothing</option>
          <option value="Electronics">Electronics</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>

        {/* Quantity dropdown */}
        <select value={quantity} onChange={handleQuantityChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        {/* Description input */}
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={handleInputChange}
        />
        <button type="submit">Add</button>
      </form>
    );
}
