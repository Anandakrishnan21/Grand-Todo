"use client";
import React, { useEffect, useState } from "react";

function UpcomingPage() {
  const [upcomingTodo, setUpcomingTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          return console.error;
        }
        const data = await res.json();
        setUpcomingTodo(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const today = new Date().toLocaleDateString("en-GB");

  const upcoming = upcomingTodo.filter(
    (todo) => todo.date > today.replace(/\//g, "-")
  );
  console.log(upcoming);

  return <div className="flex justify-center items-center pt-4"></div>;
}

export default UpcomingPage;
