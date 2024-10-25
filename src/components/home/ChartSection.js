import React, { useEffect, useState } from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis } from "recharts";

export default function BarChartComponent({ todo }) {
  const [todoCounts, setTodoCounts] = useState([]);

  useEffect(() => {
    const countsByDay = {
      Mon: 0,
      Tue: 0,
      Wed: 0,
      Thu: 0,
      Fri: 0,
      Sat: 0,
      Sun: 0,
    };

    todo.forEach((item) => {
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
    
    const totalCount = todo.length;
    const chartData = Object.entries(countsByDay).map(([day, count]) => ({
      day,
      percentage: (count / totalCount) * 100,
    }));

    setTodoCounts(chartData);
  }, [todo]);

  return (
    <div className="w-full lg:w-[500px] flex justify-center items-center h-full border bg-blue-50 shadow-sm rounded-md">
      <div className="w-1/2 md:w-2/3 h-40 md:h-60 text-sm font-semibold">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={todoCounts}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="hidden md:flex"
            />
            <Bar
              dataKey="percentage"
              fill="rgb(29 78 216)"
              radius={4}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
