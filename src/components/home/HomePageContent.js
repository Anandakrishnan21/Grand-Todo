"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Count from "./Count";
import Loading from "@/app/Loading";
import ProgressSection from "./ProgressSection";
import BarChartComponent from "./ChartSection";

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
    <div className="flex items-center flex-col p-4 gap-2">
      {session && (
        <>
          <div className="w-full md:w-[80%] flex flex-col md:flex-row gap-2 justify-between items-center pt-8">
            <div className="w-full flex flex-col gap-1 text-sm">
              <h1 className="text-xl md:text-4xl font-semibold">
                Hi {session.user.name}, welcome back
              </h1>
              {todo.length == 0 ? (
                <span className="bg-neutral-100 border p-[2px] rounded-md">
                  Add your first todo task to be smart
                </span>
              ) : (
                <span className="bg-neutral-100 border p-[2px] rounded-md">
                  Break bigger tasks into smaller, bite-sized steps.
                </span>
              )}
            </div>
            <ProgressSection todo={todo} />
          </div>
          <div className="flex flex-col h-full w-full md:w-[80%] items-center border-2 border-neutral-300 gap-4 p-4 rounded-lg">
            <p className="text-lg font-semibold">Overall Statistic Analysis</p>
            <div className="w-full flex flex-col-reverse md:flex-row items-center">
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
