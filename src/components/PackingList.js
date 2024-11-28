import Item from './Item'

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
  
    return (
      <div className="list">
        <div
          className="list-controls"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            marginBottom: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Search items..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ flex: 1 }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{ flex: 1 }}
          >
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
        </div>
        <div className="list-stats">
          <em>{filteredItems.length} items found</em>
        </div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            padding: 0,
          }}
        >
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
  