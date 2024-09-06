"use client";
import React, { useEffect, useState, useMemo } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CiMenuKebab } from "react-icons/ci";
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

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setUpcomingTodoPage(sortedTodo.slice(startIndex, endIndex));
  }, [sortedTodo, currentPage]);

  const handleButtonLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleButtonRight = () => {
    if (currentPage < Math.ceil(sortedTodo.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[80%] h-[60%] flex flex-col gap-2">
        <h1 className="font-bold text-xl">Upcoming</h1>
        <span className="text-gray-600 pb-2">Tasks</span>
        <div className="flex justify-end">
          <button
            onClick={handleButtonLeft}
            className="p-1 border-[1px] border-r-0 border-gray-500 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out rounded-l-md"
          >
            <AiOutlineLeft />
          </button>
          <div className="p-1 border-t-[1px] border-b-[1px] border-gray-500 text-sm font-bold">
            Date
          </div>
          <button
            onClick={handleButtonRight}
            className="p-1 border-[1px] border-l-0 border-gray-500 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out rounded-r-md"
          >
            <AiOutlineRight />
          </button>
        </div>
        <div className="flex gap-4">
          {upcomingTodoPage.map(([date, todos]) => (
            <div key={date} className="flex flex-col gap-2">
              <h3 className="font-semibold">{date}</h3>
              {todos.map((todo, index) => (
                <div
                  key={index}
                  className="w-64 flex border-[2px] border-gray-300 rounded-md p-2 gap-2 cursor-pointer active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out"
                >
                  <div
                    className={`w-4 h-4 rounded-full border-[2px] border-blue-800 p-1`}
                  />
                  <div className="w-full flex flex-col justify-center gap-1">
                    <p>{todo.description}</p>
                    {todo.due ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-green-500">{todo.due}</span>
                        <LuAlarmClock />
                      </div>
                    ) : null}
                    <span className="text-sm text-gray-500">
                      #inbox #study #food
                    </span>
                  </div>
                  <CiMenuKebab size={24} />
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
