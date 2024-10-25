"use client";
import React, { useEffect, useState } from "react";
import { RiDraggable } from "react-icons/ri";
import { Select, message } from "antd";
import Delete from "@/components/common/Delete";
import UpdateTask from "@/components/common/UpdateTask";
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

  const handleBlur = async (id, field) => {
    setEditingItemId(null);
    const value = editingText[id];
    try {
      const res = await fetch("/api/today", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, [field]: value }),
      });
      if (res.ok) {
        message.success("Todo updated successfully");
      } else {
        message.error("Failed to update todo");
      }
      setTodayTodos((prevTodos) =>
        prevTodos.map((item) =>
          item._id === id ? { ...item, [field]: value } : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <>
      {todayTodos.length > 0 ? (
        <div className="w-full space-y-4 bg-white border-[1px] border-[#dbdbdb] shadow-sm rounded-md p-2">
          {todayTodos.map((item) => (
            <div
              key={item._id}
              className="flex flex-row justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                {/* <RiDraggable size={20} /> */}
                {item.status !== "Done" && (
                  <Delete id={item._id} setData={setTodayTodos} />
                )}
                <div className="flex text-sm flex-col gap-1">
                  <input
                    value={editingText[item._id] || item.description}
                    onFocus={() => handleFocus(item._id, item.description)}
                    onChange={(e) =>
                      setEditingText({ [item._id]: e.target.value })
                    }
                    onBlur={() => handleBlur(item._id, "description")}
                    className={`${
                      editingItemId === item._id ? "bg-blue-400 p-1" : "p-1"
                    } w-full font-medium capitalize rounded-md p-0`}
                  />
                  <span className="text-gray-500">{item.tags}</span>
                  <p className="w-28 flex justify-center bg-blue-50 text-blue-600 p-1 rounded-md border">
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
                    onChange={(value) => handleBlur(item._id, "status", value)}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 text-sm">
                <p className="justify-end text-blue-800 font-medium">
                  {item.priority}
                </p>
                <UpdateTask todayTodo={item} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <FileNotFound />
      )}
    </>
  );
}

export default TodoItem;
