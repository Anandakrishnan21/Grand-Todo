"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Component from "./ChartSection";
import { Progress } from "./Progress";
import Count from "./Count";
import Loading from "@/app/Loading";

function HomePageContent() {
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session} = useSession();

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
          <div className="w-full md:w-[60%] flex flex-col md:flex-row justify-between items-center p-4">
            <h1 className="text-xl md:text-4xl font-semibold">
              Hi {session.user.name}, welcome back
            </h1>
            <Progress todo={todo} />
          </div>
          <div className="flex flex-col-reverse md:flex-row h-full w-full md:w-[60%] items-center border-2 border-neutral-300 gap-4 p-4 rounded-lg">
            <Count todo={todo} />
            <Component todo={todo} />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePageContent;
