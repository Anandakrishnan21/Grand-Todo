import { ArrowUpCircleIcon, GroupIcon } from "lucide-react";
import React from "react";
import { MdDone, MdOutlineTask } from "react-icons/md";

function GridData({ todo }) {
  const totalTodo = todo.length;
  let count = 0;
  todo.forEach((element) => {
    if (element.status === "Done") {
      count++;
    }
  });

  const percentage = Math.round((count / totalTodo) * 100);

  const data = [
    {
      id: 1,
      icon: GroupIcon,
      iconColor: "bg-yellow-200",
      text: "Total Groups",
      count: 0,
      icon2: ArrowUpCircleIcon,
      icon2Color: "text-black",
      percentage: "0%",
    },
    {
      id: 2,
      icon: MdOutlineTask,
      iconColor: "bg-blue-200",
      text: "Total Added Tasks",
      count: totalTodo,
      icon2: ArrowUpCircleIcon,
      icon2Color: "text-green-500",
      percentage: "100%",
    },
    {
      id: 3,
      icon: MdDone,
      iconColor: "bg-green-200",
      text: "Total Done Tasks",
      count: count,
      icon2: ArrowUpCircleIcon,
      icon2Color: percentage > 50 ? "text-green-500" : "text-red-500",
      percentage: percentage + "%",
    },
  ];

  return (
    <div className="w-full flex h-full gap-2">
      {data.map((item) => (
        <div
          key={item.id}
          className="w-1/3 flex flex-col gap-4 border-[1px] border-gray-200 rounded-lg p-2"
        >
          <div
            className={`w-8 h-8 flex justify-center items-center rounded-full ${item.iconColor}`}
          >
            <item.icon size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-semibold pb-2">{item.count}</h2>
            <p>{item.text}</p>
          </div>
          <div
            className={`flex items-center font-medium gap-2 ${item.icon2Color}`}
          >
            <item.icon2 />
            {item.percentage}
          </div>
        </div>
      ))}
    </div>
  );
}

export default GridData;
