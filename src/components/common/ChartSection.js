"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

export default function Component() {
  const [todoCounts, setTodoCounts] = useState([]);

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

        const countsByDay = {
          Mon: 0,
          Tue: 0,
          Wed: 0,
          Thu: 0,
          Fri: 0,
          Sat: 0,
          Sun: 0,
        };

        data.forEach((item) => {
          const { date } = item;
          const [day, month, year] = date.split("-");
          const parsedDate = new Date(`${year}-${month}-${day}`);

          const dayOfWeek = parsedDate.toLocaleDateString("en-GB", {
            weekday: "short",
          });

          if (countsByDay[dayOfWeek] !== undefined) {
            countsByDay[dayOfWeek] += 1;
          }
        });
        const totalCount = data.length;
        const chartData = Object.entries(countsByDay).map(([day, count]) => ({
          day,
          percentage: (count / totalCount) * 100,
        }));

        setTodoCounts(chartData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-screen lg:w-[500px] flex justify-center items-center h-64 border-[3px] rounded-lg">
      <div className="w-[80%] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={todoCounts}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <Bar dataKey="percentage" fill="rgb(29 78 216)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
