import { LucideTrash2 } from "lucide-react";
import React from "react";

function DeleteIcon({ id, setGroups }) {

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/group/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete group");
      }
      setGroups((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };
  
  return (
    <LucideTrash2
      size={16}
      className="text-blue-500 cursor-pointer"
      onClick={() => handleDelete(id)}
    />
  );
}

export default DeleteIcon;
