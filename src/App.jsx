import { useState, useEffect } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("API URL:", apiUrl);
  

  useEffect(() => {
    fetch(`${apiUrl}/api/items`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Error fetching items:", err));
  }, [apiUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/api/items`, {
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
    fetch(`${apiUrl}/api/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setItems(items.filter((item) => item._id !== id));
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="title-heading">Items</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Item
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <button
              onClick={() => handleDelete(item._id)}
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
