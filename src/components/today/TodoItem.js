"use client";
import React, { useEffect, useState } from "react";
import { Select, message } from "antd";
import Delete from "@/components/common/button/Delete";
import UpdateTask from "@/components/common/form/UpdateTask";
import FileNotFound from "../common/FileNotFound";

function TodoItem({ todayTodos, todo, setTodayTodos }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingText, setEditingText] = useState({});

  useEffect(() => {
    const today = new Date();
    const formattedDate =
      String(today.getDate()).padStart(2, "0") +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      today.getFullYear();

    setTodayTodos(todo.filter((item) => item.date === formattedDate));
  }, [todo, setTodayTodos]);

  const handleFocus = (id, text) => {
    setEditingItemId(id);
    setEditingText({ [id]: text });
  };

  const handleBlur = async (id, field, value) => {
    setEditingItemId(null);
    const updatedValue = value || editingText[id];
    try {
      const res = await fetch(`/api/today/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, [field]: updatedValue }),
      });
      if (res.ok) {
        message.success("Todo updated successfully");
        setTodayTodos((prevTodos) =>
          prevTodos.map((item) =>
            item._id === id ? { ...item, [field]: updatedValue } : item
          )
        );
      } else {
        message.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      {todayTodos.length > 0 ? (
        <div className="flex flex-col gap-2">
          {todayTodos.map((item) => (
            <div key={item._id} className="cardDiv space-y-4">
              <div className="flex flex-row justify-between gap-2">
                <div className="flex items-center gap-2 text-sm">
                  {item.status !== "Done" && (
                    <Delete id={item._id} setData={setTodayTodos} />
                  )}
                  <div className="flex flex-col gap-1">
                    <input
                      id={item._id}
                      name={item.id}
                      value={editingText[item._id] || item.description}
                      onFocus={() => handleFocus(item._id, item.description)}
                      onChange={(e) =>
                        setEditingText({ [item._id]: e.target.value })
                      }
                      onBlur={() => handleBlur(item._id, "description")}
                      className={`${
                        editingItemId === item._id ? "bg-blue-400 p-1" : ""
                      } w-full md:w-96 font-medium capitalize rounded-md p-0`}
                      autoComplete="off"
                    />
                    <span className="text-gray-500">{item.tags}</span>
                    <p className="date">
                      {item.startTime} - {item.endTime}
                    </p>
                    <Select
                      defaultValue={item.status}
                      style={{ width: 110 }}
                      options={[
                        { value: "Todo", label: "Todo" },
                        { value: "Inprogress", label: "Inprogress" },
                        { value: "Done", label: "Done" },
                      ]}
                      onChange={(value) =>
                        handleBlur(item._id, "status", value)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="justify-end text-blue-800 font-medium">
                    {item.priority}
                  </p>
                  <UpdateTask todayTodo={item} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="fileNotFound">
          <FileNotFound
            width="200"
            height="200"
            text="No tasks yet. Ready to plan something?"
          />
        </div>
      )}
    </>
  );
}

export default TodoItem;
