"use client";
import GroupForm from "@/components/common/form/GroupForm";
import GroupTask from "@/components/common/GroupTask";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function GroupTodo() {
  const [group, setGroup] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("today");
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/group/${id}`, { cache: "no-cache" });
        if (!res.ok) {
          console.error("Error fetching data");
          return;
        }
        const fetchedData = await res.json();
        setGroup(Array.isArray(fetchedData) ? fetchedData : [fetchedData]);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (group.length > 0) {
      const groupName = group.map((item) => item.group).join(", ");
      setName(groupName);
    } else {
      setName("");
    }
  }, [group]);

  return (
    <div className="flex justify-center items-center p-4 pt-4">
      <div className="outerDiv">
        <div className="flex text-sm font-medium gap-2">
          <div
            className={`flex justify-center p-1 px-2 rounded-lg border cursor-pointer transition-colors duration-300 ${
              date === "today"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-blue-50"
            }`}
            onClick={() => setDate("today")}
          >
            Today
          </div>
          <div
            className={`flex justify-center p-1 px-2 rounded-lg border cursor-pointer transition-colors duration-300 ${
              date === "upcoming"
                ? "bg-blue-50 text-blue-600"
                : "hover:bg-blue-50"
            }`}
            onClick={() => setDate("upcoming")}
          >
            Upcoming
          </div>
        </div>
        <GroupForm group={group} name={name} />
        <GroupTask name={name} currentTab={date} />
      </div>
    </div>
  );
}

export default GroupTodo;
