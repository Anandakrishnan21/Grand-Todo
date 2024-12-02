"use client";
import GroupForm from "@/components/common/form/GroupForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function GroupTodo() {
  const [group, setGroup] = useState([]);
  const [name, setName] = useState("");
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
    const groupName = group.map((item) => item.group);
    setName(groupName);
  }, [group]);

  return (
    <div className="p-2">
      <GroupForm group={group} name={name} />
    </div>
  );
}

export default GroupTodo;
