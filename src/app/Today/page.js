"use client";
import React, { useEffect, useState } from "react";
import { RiDraggable } from "react-icons/ri";
import { LuAlarmClock } from "react-icons/lu";

function Today() {
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/today", {
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
    (item) => item.date == today.replace(/\//g, "-")
  );
  
  const colorChange = (priority) => {
    if (priority == "high") {
      return "red-500";
    } else if (priority == "medium") {
      return "yellow-500";
    } else {
      return "green-500";
    }
  };

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[60%] h-[60%]">
        <h1 className="font-bold text-xl">Today</h1>
        <span className="text-gray-600 pb-2">{todayTodos.length} tasks</span>
        {todayTodos.map((item, index) => (
          <div key={index} className="flex justify-between border-b p-2">
            <div className="flex gap-2">
              <RiDraggable size={20} />
              <div className="w-4 h-4 rounded-full border-[1px] border-gray-600"></div>
              <div className="flex flex-col">
                <p>{item.description}</p>
                <span className="text-sm text-gray-600">#inbox</span>
              </div>
            </div>
            <div className="flex gap-2">
              <p className={`text-${colorChange(item.priority)}`}>{item.priority}</p>
              <p>2:00:00 Pm</p>
              <LuAlarmClock size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Today;
