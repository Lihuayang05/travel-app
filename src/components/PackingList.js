import React from "react";
import Item from "./Item";

export default function PackingList({ items, togglePacked, removeItem, updateItem, clearAllItems, searchText, setSearchText, sortBy, setSortBy }) {
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
      </div>
      <div className="list-stats">
        <em>{filteredItems.length} items found</em>
      </div>
      <button onClick={clearAllItems}>Clear All Items</button>
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
