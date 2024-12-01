"use client";
import GroupForm from "@/components/common/form/GroupForm";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function GroupTodo() {
  const [group, setGroup] = useState([]);
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

  console.log("GroupTodo:" + group);

  return (
    <div>
      <GroupForm group={group} />
    </div>
  );
}

export default GroupTodo;
