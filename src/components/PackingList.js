import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Item from "./Item";

export default function PackingList({
  items,
  togglePacked,
  removeItem,
  updateItem,
  clearAllItems,
  searchText,
  setSearchText,
  sortBy,
  setSortBy,
}) {
  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedItems = filteredItems.sort((a, b) => {
    if (sortBy === "name") {
      return a.description.localeCompare(b.description);
    }
    if (sortBy === "packed") {
      return a.packed === b.packed ? 0 : a.packed ? -1 : 1;
    }
    if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return a.quantity - b.quantity;
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Packing List", 14, 10); // Title
    doc.setFontSize(12);

    // Group items by category
    const groupedItems = sortedItems.reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {});

    // Iterate over categories and add a table for each
    Object.keys(groupedItems).forEach((category, index) => {
      if (index !== 0) doc.addPage(); 
      doc.text(`Category: ${category}`, 14, 20);

      const rows = groupedItems[category].map((item) => [
        item.description,
        item.quantity,
        item.packed ? "Yes" : "No",
      ]);

      doc.autoTable({
        startY: 30,
        head: [["Description", "Quantity", "Packed"]],
        body: rows,
      });
    });

    doc.save("packing_list.pdf");
  };

  return (
    <div className="list">
      <div className="list-controls">
        <input
          type="text"
          placeholder="Search items..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name">Sort by Name</option>
          <option value="packed">Sort by Packed Status</option>
          <option value="quantity">Sort by Quantity</option>
          <option value="category">Sort by Category</option>
        </select>
        <button
            onClick={clearAllItems}
            style={{
              backgroundColor: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Clear All Items
          </button>
          <button
            onClick={generatePDF}
            style={{
              backgroundColor: "#F4BB44",
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            Download PDF
          </button>
      </div>
      <div className="list-stats">
        <em>{filteredItems.length} items found</em>
      </div>
      <ul style={{ display: "flex", flexWrap: "wrap", gap: "1rem", padding: 0 }}>
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            item={item}
            togglePacked={togglePacked}
            removeItem={removeItem}
            updateItem={updateItem}
          />
        ))}
      </ul>
    </div>
  );
}
