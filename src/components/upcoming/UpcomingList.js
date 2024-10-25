import React from "react";
import Delete from "@/components/common/Delete";
import UpdateTask from "@/components/common/UpdateTask";

function UpcomingList({ todoList, setUpcomingTodo }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {todoList.map(([date, todos]) => (
        <div key={date} className="w-full flex flex-col gap-2">
          <h3 className="font-semibold">{date}</h3>
          <div className="flex flex-col gap-3">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="w-full flex justify-between text-sm bg-white border-[1px] gap-2 border-[#dbdbdb] shadow-sm rounded-md p-2"
              >
                <div className="flex items-center gap-2">
                  <Delete
                    id={todo._id}
                    setData={setUpcomingTodo}
                    className="p-2"
                  />
                  <div className="w-full flex flex-col justify-center gap-1">
                    <p className="font-medium capitalize">{todo.description}</p>
                    <span className="text-sm text-neutral-500">
                      {todo.tags}
                    </span>
                    {todo.startTime && (
                      <p className="w-28 flex justify-center bg-blue-50 text-blue-600 p-1 rounded-md border">
                        {todo.startTime} - {todo.endTime}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-sm">
                  <p className="text-blue-800 font-medium">{todo.priority}</p>
                  <UpdateTask todayTodo={todo} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingList;
