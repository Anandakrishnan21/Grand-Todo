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

  return (
    <div className="w-full flex h-full gap-2">
      <div className="w-1/3 flex flex-col gap-4 border-[1px] border-[#dbdbdb] rounded-md shadow-sm p-2">
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-yellow-200">
          <GroupIcon size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold pb-2">0</h2>
          <p>Total Groups</p>
        </div>
        <div className="flex items-center font-medium gap-2">
          <ArrowUpCircleIcon />
          0%
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-4 border-[1px] border-[#dbdbdb] rounded-md shadow-sm p-2">
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-blue-200">
          <MdOutlineTask size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold pb-2">{totalTodo}</h2>
          <p>Total Added Tasks</p>
        </div>
        <div className="flex items-center font-medium gap-2 text-green-500">
          <ArrowUpCircleIcon />
          100%
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-4 border-[1px] border-[#dbdbdb] rounded-md shadow-sm p-2">
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-green-200">
          <MdDone size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-semibold pb-2">{count}</h2>
          <p>Total Done Tasks</p>
        </div>
        <div
          className={`${
            percentage > 50 ? "text-green-500" : "text-red-500"
          } flex items-center font-medium gap-2`}
        >
          <ArrowUpCircleIcon />
          {percentage}%
        </div>
      </div>
    </div>
  );
}

export default GridData;
