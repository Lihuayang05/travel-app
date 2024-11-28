import React, { useState } from "react";

export default function Item({ item, togglePacked, removeItem, updateItem }) {
  const [editDescription, setEditDescription] = useState(item.description);
  const [editQuantity, setEditQuantity] = useState(item.quantity);
  const [editCategory, setEditCategory] = useState(item.category);

  const handleDescriptionChange = (e) => setEditDescription(e.target.value);
  const handleQuantityChange = (e) => setEditQuantity(e.target.value);
  const handleCategoryChange = (e) => setEditCategory(e.target.value);

  const handleSave = (e) => {
    e.stopPropagation();
    updateItem(item.id, editDescription, editQuantity, editCategory);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); 
    removeItem(item.id); 
  };

  const handleItemClick = (e) => {
    if (
      !e.target.closest('input') && 
      !e.target.closest('select') 
    ) {
      togglePacked(item.id);
    }
  };

  return (
    <li
      onClick={handleItemClick}
      style={{
        backgroundColor: item.packed ? "#D3D3D3" : "#4657c6",
        padding: "1rem", 
        borderRadius: "1rem",
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem", 
        cursor: "pointer",  
        boxShadow: item.packed ? "none" : "0 4px 12px rgba(0, 0, 0, 0.2)", 
        outline: "none", 
        border: "none", 
        WebkitTapHighlightColor: "transparent",  
      }}
    >
      <input
        type="text"
        value={editDescription}
        onChange={handleDescriptionChange}
        placeholder="Edit description"
        disabled={item.packed}
      />
      <input
        type="number"
        value={editQuantity}
        onChange={handleQuantityChange}
        min="1"
        placeholder="Edit quantity"
        disabled={item.packed} 
      />
      
      <select value={editCategory} onChange={handleCategoryChange} disabled={item.packed}>
        <option value="Toiletries">Toiletries</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Miscellaneous">Miscellaneous</option>
      </select>

      <span>{item.category}</span> 

      <button onClick={handleRemove}>❌</button>
      <button onClick={handleSave} style={{ backgroundColor: 'hsl(237, 100%, 81%)', color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "16px" }}>
        Save
      </button>
    </li>
  );
}
