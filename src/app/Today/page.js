"use client";
import React, { useEffect, useState } from "react";
import { RiDraggable } from "react-icons/ri";
import { LuAlarmClock } from "react-icons/lu";
import { message, Select } from "antd";
import Delete from "@/components/common/Delete";
import FileNotFound from "@/components/common/FileNotFound";
import Loading from "../Loading";
import UpdateTask from "@/components/common/UpdateTask";
import { Reorder } from "framer-motion";

function Today() {
  const [todo, setTodo] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [editingText, setEditingText] = useState({});

  const showNotification = () => {
    messageApi.open({
      type: "success",
      content: "You have one task to do :)",
      duration: 10,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("Error fetching data");
        }
        const data = await res.json();
        setTodo(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const today = new Date().toLocaleDateString("en-GB");
  const todayTodos = todo.filter(
    (item) => item.date === today.replace(/\//g, "-")
  );

  const now = new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    todayTodos.forEach((todo) => {
      if (todo.due === now) {
        showNotification();
      }
    });
  }, [now, todayTodos]);

  const handleFocus = (id, text) => {
    setEditingItemId(id);
    setEditingText({ ...editingText, [id]: text });
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
      setTodo((prevTodos) =>
        prevTodos.map((item) =>
          item._id === id ? { ...item, [field]: value } : item
        )
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleReorder = (newOrder) => {
    setTodo(newOrder);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center p-4">
      {contextHolder}
      <div className="w-full lg:w-[80%] flex flex-col gap-2">
        <h1 className="font-bold text-xl">Today</h1>
        <span className="text-gray-600 pb-2">{todayTodos.length} tasks</span>
        {todayTodos.length > 0 ? (
          <Reorder.Group
            values={todayTodos}
            onReorder={handleReorder}
            as="div"
            className="w-full space-y-4 bg-neutral-100 border p-2 rounded-md"
          >
            {todayTodos.map((item, index) => (
              <Reorder.Item
                key={index}
                value={item}
                as="div"
                className="flex flex-col md:flex-row justify-between"
              >
                <div className="flex items-center gap-2">
                  <RiDraggable size={20} />
                  {item.status !== "Done" ? (
                    <Delete id={item._id} setData={setTodo} />
                  ) : (
                    ""
                  )}
                  <div className="flex flex-col">
                    <input
                      value={editingText[item._id] || item.description}
                      onFocus={() => handleFocus(item._id, item.description)}
                      onChange={(e) =>
                        setEditingText({
                          ...editingText,
                          [item._id]: e.target.value,
                        })
                      }
                      onBlur={() => handleBlur(item._id, "description")}
                      className={`${
                        editingItemId === item._id
                          ? "bg-blue-400 text-white p-1 border-dashed"
                          : ""
                      }`}
                    />
                    <span className="text-sm text-gray-800">{item.tags}</span>
                  </div>
                </div>
                <div className="flex justify-around items-center gap-2 text-sm">
                  <p
                    className={`${
                      item.priority === "high"
                        ? "text-red-500"
                        : item.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    } rounded-md px-1`}
                  >
                    {item.priority}
                  </p>
                  <Select
                    defaultValue={item.status}
                    style={{
                      width: 120,
                    }}
                    status={
                      item.status === "Done"
                        ? "success"
                        : item.status === "Inprogress"
                        ? "warning"
                        : "error"
                    }
                    options={
                      item.status !== "Done"
                        ? [
                            { value: "Todo", label: "Todo" },
                            { value: "Inprogress", label: "Inprogress" },
                            { value: "Done", label: "Done" },
                          ]
                        : [{ value: "Done", label: "Done" }]
                    }
                    onChange={(value) => handleBlur(item._id, "status", value)}
                  />
                  {item?.due ? (
                    <div className="flex gap-1">
                      {item.due} <LuAlarmClock size={20} />
                    </div>
                  ) : (
                    ""
                  )}
                  <UpdateTask todayTodo={item} />
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        ) : (
          <FileNotFound />
        )}
      </div>
    </div>
  );
}

export default Today;
