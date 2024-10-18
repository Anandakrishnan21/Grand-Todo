"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Count from "./Count";
import Loading from "@/app/Loading";
import ProgressSection from "./ProgressSection";
import BarChartComponent from "./ChartSection";
import { RiProgress1Line, RiTodoLine } from "react-icons/ri";
import { AiOutlineFileDone } from "react-icons/ai";

function HomePageContent() {
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("Error fetching data");
        }
        const data = await res.json();
        setTodo(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="flex items-center flex-col p-4 gap-4">
      {session && (
        <>
          <div className="w-full md:w-[90%] flex flex-col md:flex-row gap-4 justify-between items-center pt-8">
            <div className="w-full flex flex-col gap-1 text-sm">
              <h1 className="text-xl md:text-4xl font-semibold">
                Hi {session.user.name}, welcome back
              </h1>
              {todo.length == 0 ? (
                <div>
                  <span className="bg-white border-[1px] border-neutral-300 shadow-sm rounded-md p-1">
                    Add your first todo task to be smart
                  </span>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <span className="bg-white border-[1px] border-neutral-300 shadow-sm rounded-md p-1">
                    Break bigger tasks into smaller, bite-sized steps.
                  </span>
                  <div className="flex justify-center md:justify-start text-blue-800 gap-3">
                    <div className="iconDiv">
                      <RiTodoLine size={24} />
                      <p>Todo</p>
                    </div>
                    <div className="iconDiv">
                      <RiProgress1Line size={24} />
                      <p>InProgress</p>
                    </div>
                    <div className="iconDiv">
                      <AiOutlineFileDone size={24} />
                      <p>Done</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <ProgressSection todo={todo} />
          </div>
          <div className="bg-white flex flex-col h-full w-full md:w-[90%] items-center border-[1px] border-neutral-300 shadow-sm gap-4 p-4 rounded-lg">
            <p className="text-lg font-semibold">Overall Statistic Analysis</p>
            <div className="w-full flex flex-col-reverse md:flex-row justify-center items-center gap-4">
              <Count todo={todo} />
              <BarChartComponent todo={todo} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePageContent;
