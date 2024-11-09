"use client";
import Loading from "@/app/Loading";
import React, { useEffect, useState, useMemo } from "react";
import UpcomingList from "./UpcomingList";
import FileNotFound from "../common/FileNotFound";

function UpcomingTodo() {
  const [upcomingTodo, setUpcomingTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("Failed to fetch data");
          return;
        }
        const data = await res.json();
        setUpcomingTodo(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const sortedTodo = useMemo(() => {
    const groupedTodo = {};
    upcomingTodo.forEach((todo) => {
      const [day, month, year] = todo.date.split("-");
      const todoDate = new Date(`${year}-${month}-${day}`);
      if (todoDate > today) {
        if (!groupedTodo[todo.date]) {
          groupedTodo[todo.date] = [];
        }
        groupedTodo[todo.date].push(todo);
      }
    });

    return Object.entries(groupedTodo).sort((a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateA - dateB;
    });
  }, [upcomingTodo, today]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center p-4 pt-4 md:p-4">
      <div className="outerDiv">
        <div>
          <h1 className="font-bold text-xl">Upcoming</h1>
          <span className="text-gray-600 pb-2">Tasks</span>
        </div>
        {sortedTodo.length > 0 ? (
          <UpcomingList
            todoList={sortedTodo}
            setUpcomingTodo={setUpcomingTodo}
          />
        ) : (
          <div className="fileNotFound">
            <FileNotFound
              width="200"
              height="200"
              text="No tasks yet. Ready to plan something?"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default UpcomingTodo;
