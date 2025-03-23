const API_URL = import.meta.env.VITE_API_URL;

export const deleteItem = async (type, itemId, token, setState) => {
  try {
    const response = await fetch(`${API_URL}/api/${type}/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete item");

    setState((prevItems) => prevItems.filter((item) => item._id !== itemId));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const editItem = async (type, itemId, updatedData, token, setState) => {
  try {
    const response = await fetch(`${API_URL}/api/${type}/${itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error("Failed to update item");

    const data = await response.json();

    setState((prevItems) =>
      prevItems.map((item) => (item._id === itemId ? data : item))
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
