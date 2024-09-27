"use client";
import { Percent } from "lucide-react";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer } from "recharts";

export default function Component() {
  const [todoCounts, setTodoCounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.error("error");
        }
        const data = await res.json();
        const statusCounts = data.reduce((acc, item) => {
          const status = item.status;
          acc[status] = (acc[status] || 0) + 1;
          return acc;
        }, {});

        const totalCount = Object.values(statusCounts).reduce(
          (sum, count) => sum + count,
          0
        );

        const chartData = Object.entries(statusCounts).map(
          ([status, count]) => ({
            status,
            percentage: (count / totalCount) * 100,
          })
        );

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
            <Bar dataKey="percentage" fill="rgb(29 78 216)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
