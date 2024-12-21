import React, { useEffect, useState } from "react";
import FileNotFound from "./FileNotFound";
import { Select, message } from "antd";
import { useSession } from "next-auth/react";

function GroupTask({ id, currentTab }) {
  const [groupTodo, setGroupTodo] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/groupTodo", {
          cache: "no-cache",
        });

        if (!res.ok) {
          console.error("Error fetching groupTodo");
          return;
        }

        const data = await res.json();
        setGroupTodo(data);
      } catch (error) {
        console.error("Error fetching groupTodo:", error);
      }
    };

    fetchData();
  }, []);

  const filteredTodo = groupTodo.filter((todo) => {
    const isToday = currentTab === "today";
    const isUpcoming = currentTab === "upcoming";

    const today = new Date();
    const formattedDate =
      String(today.getDate()).padStart(2, "0") +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      today.getFullYear();

    return (
      todo.groupId === id &&
      ((isToday && todo.date === formattedDate) ||
        (isUpcoming && todo.date > formattedDate))
    );
  });

  const handleBlur = async (id, field, value) => {
    try {
      const res = await fetch(`/api/groupTodo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (res.ok) {
        setGroupTodo((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, [field]: value } : todo
          )
        );
        message.success("Todo updated successfully!");
      } else {
        message.error("Failed to update todo");
      }
    } catch (error) {
      message.error("An error occurred while updating");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {filteredTodo.length > 0 ? (
        filteredTodo.map((todo, index) => (
          <div
            key={todo._id || index}
            className="cardDiv text-sm flex justify-between gap-2 p-4"
          >
            <div className="w-full flex flex-row gap-2 text-sm justify-between">
              <div className="flex flex-col gap-1">
                <p className="capitalize font-medium">{todo.description}</p>
                <span className="flex gap-1 items-center text-sm">
                  Date: {todo.date}
                </span>
                <span className="text-neutral-500">{todo.tags}</span>
                {todo.startTime && (
                  <p className="date">
                    {todo.startTime} - {todo.endTime}
                  </p>
                )}

                {todo.members.find(
                  (member) => member.email === session?.user?.email
                ) ? (
                  <Select
                    defaultValue={
                      todo.members.find(
                        (member) => member.email === session?.user?.email
                      )?.progress || ""
                    }
                    style={{ width: 110 }}
                    options={[
                      { value: "Todo", label: "Todo" },
                      { value: "Inprogress", label: "Inprogress" },
                      { value: "Done", label: "Done" },
                    ]}
                    onChange={(value) =>
                      handleBlur(
                        todo._id,
                        "members",
                        todo.members.map((member) =>
                          member.email === session?.user?.email
                            ? { ...member, progress: value }
                            : member
                        )
                      )
                    }
                  />
                ) : null}
              </div>
              <p className="text-blue-800 font-medium">{todo.priority}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="fileNotFound">
          <FileNotFound width="200" height="200" text="Todo not found" />
        </div>
      )}
    </div>
  );
}

export default GroupTask;
