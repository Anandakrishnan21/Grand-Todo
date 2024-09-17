"use client";
import Delete from "@/components/Delete";
import Pagination from "@/components/Pagination";
import { Inbox} from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";

function UpcomingPage() {
  const [upcomingTodo, setUpcomingTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [upcomingTodoPage, setUpcomingTodoPage] = useState([]);
  const itemsPerPage = 4;
  const today = new Date();

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

  const sortedTodo = useMemo(() => {
    const groupedTodo = {};

    upcomingTodo.filter((todo) => {
      const [day, month, year] = todo.date.split("-");
      const todoDate = new Date(`${year}-${month}-${day}`);
      if (todoDate > today) {
        if (!groupedTodo[todo.date]) {
          groupedTodo[todo.date] = [];
        }
        groupedTodo[todo.date].push(todo);
      }
      return todoDate > today;
    });

    return Object.entries(groupedTodo).sort((a, b) => {
      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateA - dateB;
    });
  }, [upcomingTodo]);

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
        <div className="flex gap-4">
          {upcomingTodoPage.map(([date, todos]) => (
            <div key={date} className="flex flex-col gap-2">
              <h3 className="font-semibold">{date}</h3>
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className="w-80 md:w-64 flex border-[2px] border-gray-300 rounded-md p-2 gap-2 cursor-pointer active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out"
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
                    <span className="flex gap-1 items-center text-sm text-gray-600">
                      <Inbox size={16} /> inbox
                    </span>
                    <span className="text-sm text-gray-800">{todo.tags}</span>
                  </div>
                  <AiOutlineEdit size={24} color="gray" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UpcomingPage;
