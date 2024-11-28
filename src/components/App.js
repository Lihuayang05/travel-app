import React, { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, category:"Toiletries", packed: false },
  { id: 2, description: "Pants", quantity: 2, category:"Clothing", packed: false },
  { id: 3, description: "Toothbrush", quantity: 1, category:"Toiletries", packed: false },
  { id: 4, description: "Socks", quantity: 3,  category:"Clothing",packed: false },
];

function App() {
  const [items, setItems] = useState(initialItems);
  const [searchText, setSearchText] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const addItem = (newItem) => {
    setItems((prevItems) => [
      ...prevItems,
      { ...newItem, id: Date.now(), packed: false },
    ]);
  };

  const togglePacked = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearAllItems = () => {
    setItems([]);
  };

  const updateItem = (id, newDescription, newQuantity, newCategory) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, description: newDescription, quantity: newQuantity, category: newCategory }
          : item
      )
    );
  };

  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        items={items}
        togglePacked={togglePacked}
        removeItem={removeItem}
        searchText={searchText}
        setSearchText={setSearchText}
        sortBy={sortBy}
        setSortBy={setSortBy}
        clearAllItems={clearAllItems}
        updateItem = {updateItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;