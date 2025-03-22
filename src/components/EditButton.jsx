const EditButton = ({ itemId, onEdit }) => {
    return (
      <button onClick={() => onEdit(itemId)} className="edit-btn">
        ✏️ Edit
      </button>
    );
  };
  
  export default EditButton;