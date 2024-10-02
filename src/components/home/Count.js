import React, { useEffect, useState } from "react";
import { MdAutoFixHigh } from "react-icons/md";
import { RiProgress1Fill, RiTodoFill } from "react-icons/ri";

function Count({ todo }) {
  const [statusCount, setStatusCount] = useState([]);
  useEffect(() => {
    const counts = {
      Todo: 0,
      InProgress: 0,
      Done: 0,
    };
    todo.forEach((task) => {
      if (task.status === "Todo") counts.Todo++;
      if (task.status === "InProgress") counts.InProgress++;
      if (task.status === "Done") counts.Done++;
    });

    setStatusCount(counts);
  }, [todo]);

  return (
    <div className="flex flex-row md:flex-col text-sm font-semibold gap-2">
      {Object.entries(statusCount).map(([status, counts]) => (
        <div key={status} className="flex items-center gap-2 p-1 bg-neutral-200 rounded-md">
          {status === "Done" ? (
            <RiProgress1Fill size={16} />
          ) : status === "InProgress" ? (
            <MdAutoFixHigh size={16} />
          ) : (
            <RiTodoFill size={16} />
          )}
          <p className="flex items-center gap-2">
            {status} <span>{counts}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default Count;
