"use client";
import Delete from "@/components/common/Delete";
import FileNotFound from "@/components/common/FileNotFound";
import Pagination from "@/components/common/Pagination";
import { Inbox } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";
import Loading from "../Loading";
import UpdateTask from "@/components/common/UpdateTask";

function UpcomingPage() {
  const [upcomingTodo, setUpcomingTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingTodoPage, setUpcomingTodoPage] = useState([]);
  const itemsPerPage = 4;
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
  }, [upcomingTodo]);

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setUpcomingTodoPage(sortedTodo.slice(start, end));
  }, [sortedTodo, currentPage, itemsPerPage]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[80%] h-[60%] flex flex-col gap-2">
        <h1 className="font-bold text-xl">Upcoming</h1>
        <span className="text-gray-600 pb-2">Tasks</span>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          inbox={sortedTodo}
          setPaginationInbox={setUpcomingTodoPage}
        />
        {sortedTodo.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-4">
            {upcomingTodoPage.map(([date, todos]) => (
              <div key={date} className="flex flex-col gap-2">
                <h3 className="font-semibold">{date}</h3>
                {todos.map((todo, index) => (
                  <div
                    key={index}
                    className="w-full md:w-64 flex bg-purple-200 text-black rounded-md p-2 gap-2 cursor-pointer active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out"
                  >
                    <Delete
                      id={todo._id}
                      setData={setUpcomingTodo}
                      className="p-2"
                    />
                    <div className="w-full flex flex-col justify-center gap-1">
                      <p>{todo.description}</p>
                      {todo.due ? (
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-green-500">{todo.due}</span>
                          <LuAlarmClock />
                        </div>
                      ) : null}
                      <span className="flex gap-1 items-center text-sm">
                        <Inbox size={16} /> inbox
                      </span>
                      <span className="text-sm">{todo.tags}</span>
                    </div>
                    <UpdateTask todayTodo={todo} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <FileNotFound />
        )}
      </div>
    </div>
  );
}

export default UpcomingPage;
