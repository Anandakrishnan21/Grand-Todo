import React from "react";

function Delete({ id, setData }) {
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/today/${id}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (res.ok) {
        setData((prevData) => prevData.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className="w-4 h-4 rounded-full border-[1px] border-gray-600 cursor-pointer p-2"
      onClick={() => deleteTodo(id)}
    />
  );
}

export default Delete;
