"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/app/Loading";
import ProgressSection from "./ProgressSection";
import RecentTodo from "./RecentTodo";
import GridData from "./GridData";
import AddGroup from "../common/form/AddGroup";
import FileNotFound from "../common/FileNotFound";
import Group from "./Group";

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
          <div className="dashboard">
            <div className="w-full md:w-1/2 h-full md:h-60 flex flex-col gap-1 text-sm">
              <h1 className="text-xl md:text-2xl font-semibold">
                Hi {session.user.name}, welcome back
              </h1>
              <p>Here you will find your todo analytics !</p>
              <GridData todo={todo} />
            </div>
            <ProgressSection todo={todo} />
          </div>
          <div className="flex flex-col lg:flex-row h-40 md:h-80 w-full md:w-[90%] items-center gap-2 px-2">
            <Group />
            <RecentTodo />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePageContent;
