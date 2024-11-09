import { Button, Checkbox, Spin } from "antd";
import Link from "antd/es/typography/Link";
import { ArrowRightCircleIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import FileNotFound from "../common/FileNotFound";

function RecentTodo() {
  const [todo, setTodo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/today/limit/3", {
          "cache-control": "no-cache",
        });
        const data = await res.json();
        setTodo(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const calculateRemainingTime = () => {
      const date = new Date();
      const hoursLeft = 23 - date.getHours();
      const minutesLeft = 59 - date.getMinutes();
      const secondsLeft = 59 - date.getSeconds();
      setRemainingTime({
        hours: hoursLeft,
        minutes: minutesLeft,
        seconds: secondsLeft,
      });
    };

    calculateRemainingTime();

    const interval = setInterval(calculateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const date = new Date().getDate();

  return (
    <div className="cardGrp justify-between">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Recent Todo</h1>
        <Button>
          <Link href="/day">Go to task</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <Spin size="large" />
          </div>
        ) : todo.length > 0 ? (
          todo.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border rounded-lg text-sm p-2 gap-2"
            >
              <Checkbox />
              <p className="w-40 md:w-60 font-medium truncate">
                {item.description}
              </p>
              <span
                className={`w-20 text-center border ${
                  item.priority === "Low"
                    ? "text-green-600 bg-green-50"
                    : item.priority === "Medium"
                    ? "text-yellow-600 bg-yellow-50"
                    : "text-red-600 bg-red-50"
                } p-[2px] rounded-md`}
              >
                {item.priority}
              </span>
              <p className="bg-blue-50 text-blue-600 border p-[2px] px-1 rounded-lg">
                {item.date}
              </p>
              <ArrowRightCircleIcon
                color="blue"
                size="20"
                className="hidden md:flex"
              />
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col gap-2 justify-center items-center py-4">
            <FileNotFound
              width="100"
              height="100"
              text="Not Yet created a task"
            />
          </div>
        )}
      </div>
      <div className="flex justify-between bg-neutral-200 text-sm rounded-xl p-2">
        <div className="flex flex-col">
          <p>Time left Today</p>
          <p className="text-3xl font-bold">
            {remainingTime.hours.toString().padStart(2, "0")}:
            {remainingTime.minutes.toString().padStart(2, "0")}:
            {remainingTime.seconds.toString().padStart(2, "0")}
          </p>
        </div>
        <div className="h-20 flex flex-col items-center">
          <p>Calendar</p>
          <div className="relative">
            <Image
              src="/images/calendar.png"
              alt="Calendar"
              width="70"
              height="70"
              className="grayscale relative"
            />
            <p className="absolute inset-0 text-lg flex items-center justify-center">
              {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentTodo;
