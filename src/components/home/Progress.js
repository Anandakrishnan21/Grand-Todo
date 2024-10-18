"use client";
import { useEffect, useState } from "react";
import { RadialBar, RadialBarChart, PolarAngleAxis, ResponsiveContainer } from "recharts";

export function ProgressComponent({ todo }) {
  const [notDoneCount, setNotDoneCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    if (todo.length > 0) {
      const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-");

      const todayTasks = todo.filter((item) => item.date === today);
      const unDone = todayTasks.filter((item) => item.status !== "Done");
      const totalCount = todayTasks.length;
      setNotDoneCount(unDone.length);

      const percentage =
        totalCount > 0 ? Math.round((unDone.length / totalCount) * 100) : 0;
      setPercentage(percentage);
    }
  }, [todo]);

  const chartData = [
    {
      name: "Incomplete",
      value: percentage,
    },
  ];

  return (
    <div className="w-1/2 md:w-2/3 h-52 text-sm font-semibold">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius={60}
          outerRadius={100}
          barSize={10}
          data={chartData}
          startAngle={90}
          endAngle={450}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            minAngle={15}
            clockWise
            dataKey="value"
            cornerRadius={10}
            fill="rgb(29 78 216)"
            background={{ fill: "#d3d3d3" }}
          />
          <text
            x={"50%"}
            y={"50%"}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <tspan className="fill-foreground text-4xl font-bold">
              {Math.round(percentage)}%
            </tspan>
          </text>
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
