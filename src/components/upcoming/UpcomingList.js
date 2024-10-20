import React from "react";
import Delete from "@/components/common/Delete";
import UpdateTask from "@/components/common/UpdateTask";
import { LuAlarmClock } from "react-icons/lu";
import { Inbox } from "lucide-react";

function UpcomingList({ todoList, setUpcomingTodo }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {todoList.map(([date, todos]) => (
        <div key={date} className="w-full flex text-sm flex-col gap-2">
          <h3 className="font-semibold">{date}</h3>
          {todos.map((todo, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 flex bg-white border-[1px] border-neutral-300 rounded-md p-2 gap-2 cursor-pointer active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out"
            >
              <Delete id={todo._id} setData={setUpcomingTodo} className="p-2" />
              <div className="w-full flex flex-col justify-center gap-1">
                <p className="font-semibold">{todo.description}</p>
                <div className="flex flex-col gap-1">
                  <p
                    className={`w-full border-[1px] flex justify-center items-center rounded-md p-1 ${
                      todo.priority === "high"
                        ? "bg-red-300"
                        : todo.priority === "Medium"
                        ? "border-violet-300"
                        : "border-yellow-300"
                    }`}
                  >
                    {todo.priority}
                  </p>
                  {todo.startTime ? (
                    <p>
                      Time:{" "}
                      <span>
                        {todo.startTime} - {todo.endTime}
                      </span>
                    </p>
                  ) : null}
                </div>
                <span className="text-sm">{todo.tags}</span>
              </div>
              <UpdateTask todayTodo={todo} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UpcomingList;
