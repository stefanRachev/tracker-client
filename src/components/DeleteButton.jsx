const DeleteButton = ({ itemId, onDelete }) => {
    return (
      <button onClick={() => onDelete(itemId)} className="delete-btn">
        🗑️ Delete
      </button>
    );
  };
  
  export default DeleteButton;