import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

 
  useEffect(() => {
    fetch("http://localhost:5001/api/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    })
      .then((res) => res.json())
      .then((data) => {
        setItems([...items, data]);
        setName("");
        setDescription("");
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5001/api/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  return (
    <div>
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
