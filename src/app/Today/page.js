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
  return (
    <div>
      <p>Today's Todo Tasks</p>
      {todo.map((item, index) => (
        <div key={index}>
          <p>{item.description}</p>
          <p>{item.date}</p>
        </div>
      ))}
    </div>
  );
}

export default Today;
