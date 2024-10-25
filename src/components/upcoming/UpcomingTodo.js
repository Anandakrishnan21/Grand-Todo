"use client";
import Loading from "@/app/Loading";
import React, { useEffect, useState, useMemo } from "react";
import UpcomingList from "./UpcomingList";
import FileNotFound from "../common/FileNotFound";

function UpcomingTodo() {
  const [upcomingTodo, setUpcomingTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const today = new Date();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
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
    }
  }, [isMounted]);

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

  if (!isMounted) return null;

  return (
    <div className="flex justify-center items-center p-4 pt-0 md:p-4">
      <div className="w-full lg:w-[80%] h-[60%] flex flex-col gap-2 p-2">
        <h1 className="font-bold text-xl">Upcoming</h1>
        <span className="text-gray-600 pb-2">Tasks</span>
        {sortedTodo.length > 0 ? (
          <UpcomingList
            todoList={sortedTodo}
            setUpcomingTodo={setUpcomingTodo}
          />
        ) : (
          <FileNotFound />
        )}
      </div>
    </div>
  );
}

export default UpcomingTodo;
