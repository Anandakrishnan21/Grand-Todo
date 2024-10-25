import React from "react";
import Delete from "@/components/common/Delete";
import UpdateTask from "@/components/common/UpdateTask";

function UpcomingList({ todoList, setUpcomingTodo }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {todoList.map(([date, todos]) => (
        <div key={date} className="w-full flex text-sm flex-col gap-2">
          <h3 className="font-semibold">{date}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="w-full flex items-center bg-white border-[1px] gap-2 border-[#dbdbdb] shadow-sm rounded-md p-2"
              >
                <Delete
                  id={todo._id}
                  setData={setUpcomingTodo}
                  className="p-2"
                />
                <div className="w-full flex flex-col justify-center gap-1">
                  <p className="font-medium capitalize">{todo.description}</p>
                  <span className="text-sm">{todo.tags}</span>
                  <div className="flex flex-col gap-1">
                    {todo.startTime ? (
                      <p className="w-28 flex justify-center bg-blue-50 text-blue-600 p-1 rounded-md border">
                        {todo.startTime} - {todo.endTime}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-sm">
                  <p className="justify-end text-blue-800 font-medium">
                    {todo.priority}
                  </p>
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
