"use client";
import React, { useEffect, useState } from "react";
import { RiDraggable } from "react-icons/ri";
import { LuAlarmClock } from "react-icons/lu";
import { message } from "antd";
import Delete from "@/components/Delete";

function Today() {
  const [todo, setTodo] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const showNotification = () => {
    messageApi.open({
      type: "success",
      content:
        "This is a prompt message for success, and it will disappear in 10 seconds",
      duration: 10,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("error");
        }
        const data = await res.json();
        setTodo(data);
      } catch (error) {
        console.error("error");
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

  const handleUpdate = async (id, field, value) => {
    const updateTodo = todo.map((item) =>
      item._id === id ? { ...item, [field]: value } : item
    );
    setTodo(updateTodo);
    try {
      const res = await fetch("/api/today", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, [field]: value }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center pt-4">
      {contextHolder}
      <div className="w-[60%] h-[60%]">
        <h1 className="font-bold text-xl">Today</h1>
        <span className="text-gray-600 pb-2">{todayTodos.length} tasks</span>
        {todayTodos.map((item, index) => (
          <div key={index} className="flex justify-between border-b p-2">
            <div className="flex gap-2">
              <RiDraggable size={20} />
              <Delete id={item._id} setData={setTodo} />
              <div className="flex flex-col">
                <div className="flex gap-2">
                  <p
                    contentEditable
                    suppressHydrationWarning={true}
                    onBlur={(e) =>
                      handleUpdate(item._id, "description", e.target.innerText)
                    }
                  >
                    {item.description}
                  </p>
                  <span className="text-sm text-gray-500">{item.tags}</span>
                </div>
                <span className="text-sm text-gray-600">#inbox</span>
              </div>
            </div>
            <div className="flex gap-2 text-sm">
              <p>{item.priority}</p>
              {item?.due ? item.due : "02:00"}
              <LuAlarmClock size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Today;
