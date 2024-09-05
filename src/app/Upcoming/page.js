"use client";
import React, { useEffect, useState } from "react";

function UpcomingPage() {
  const [upcomingTodo, setUpcomingTodo] = useState([]);
  const groupedTodo = {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("Failed to fetch data");
          return;
        }
        const data = await res.json();
        setUpcomingTodo(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const today = new Date();

  const upcoming = upcomingTodo.filter((todo) => {
    const [day, month, year] = todo.date.split("-");
    const todoDate = new Date(`${year}-${month}-${day}`);
    if (todoDate > today) {
      if (!groupedTodo[todo.date]) {
        groupedTodo[todo.date] = [];
      }
      groupedTodo[todo.date].push(todo);
    }
  });

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[80%] h-[60%]">
        <h1 className="font-bold text-xl">Upcoming</h1>
        <span className="text-gray-600 pb-2">
          {Object.entries(groupedTodo).length} tasks
        </span>
        <div className="flex gap-4">
          {Object.entries(groupedTodo).map(([date, todos]) => (
            <div key={date}>
              <h3 className="font-semibold">{date}</h3>
              <div className="border-[1px] border-gray-500 rounded-md p-2">
                {todos.map((todo, index) => (
                  <div key={index} className="">
                    <p>{todo.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpcomingPage;
