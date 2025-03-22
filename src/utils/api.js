const API_URL = import.meta.env.VITE_API_URL;



export const deleteItem = async (type, itemId, token) => {
    try {
      const response = await fetch(`${API_URL}/api/${type}/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
  
      if (!response.ok) throw new Error("Failed to delete item");
  
      return true; 
    } catch (error) {
      console.error(error);
      return false; 
    }
  };
  
  export const editItem = async (type, itemId, updatedData, token) => {
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
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  