"use client";
import Loading from "@/app/Loading";
import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { message } from "antd";

function TodayTodo() {
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [todayTodos, setTodayTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("Error fetching data");
          return;
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center p-4 pt-0 md:p-4">
      {contextHolder}
      <div className="w-full lg:w-[80%] flex flex-col p-2 gap-2">
        <div className="sticky bg-white">
          <h1 className="font-bold text-xl">Today</h1>
          <span className="text-gray-600 pb-2">{todayTodos.length} tasks</span>
        </div>
        <TodoItem
          todayTodos={todayTodos}
          setTodayTodos={setTodayTodos}
          todo={todo}
        />
      </div>
    </div>
  );
}

export default TodayTodo;
