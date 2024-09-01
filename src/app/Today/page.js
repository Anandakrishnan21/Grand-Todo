"use client";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[60%] h-[60%]">
        <h1 className="font-bold text-xl">Today</h1>
        <span className="text-gray-600">{todayTodos.length} tasks</span>
        {todayTodos.map((item, index) => (
          <div key={index} className="flex items-center gap-2 border-b p-2">
            <div className="w-4 h-4 rounded-full border-[1px] border-gray-600"></div>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Today;
