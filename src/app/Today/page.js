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

  return (
    <div>
      <p>Today's Todo Tasks</p>
      {todo
        .filter((item) => item.date === today.replace(/\//g, "-"))
        .map((item, index) => (
          <div key={index}>
            <p>{item.description}</p>
          </div>
        ))}
    </div>
  );
}

export default Today;
