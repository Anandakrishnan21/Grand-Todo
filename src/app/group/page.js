"use client";
import { Avatar } from "antd";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function GroupPage() {
  const [groups, setGroups] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/group", { cache: "no-cache" });

        if (!res.ok) {
          console.error("Error fetching data");
          return;
        }

        const fetchedData = await res.json();
        setGroups(fetchedData);
      } catch (error) {
        console.error("Error fetching group data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGroup = (item) => {
    router.push(`/group/groupTodo/${item._id}`);
  };

  return (
    <div className="flex justify-center items-center p-4 pt-4">
      <div className="outerDiv flex flex-row">
        <h1 className="font-bold text-xl">Groups</h1>
        {groups.length > 0
          ? groups
              .filter(
                (item) =>
                  item.members.includes(session?.user?.email) ||
                  item.email === session?.user?.email
              )
              .map((item) => (
                <div
                  key={item._id}
                  className="w-full lg:w-1/3 flex flex-col gap-2 text-sm border-[1px] border-gray-300 cursor-pointer rounded-lg p-2"
                  onClick={() => handleGroup(item)}
                >
                  <div className="flex justify-between">
                    <p
                      className="capitalize text-base font-semibold"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.group}
                    </p>
                    <span className="flex justify-center items-center bg-blue-50 text-xs font-medium px-2 rounded-md">
                      {item.admin}
                    </span>
                  </div>
                  <div>
                    <span>
                      No of members in the group {item.members.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <Avatar.Group>
                      {item.members.map((member, index) => (
                        <Avatar
                          key={index}
                          style={{
                            backgroundColor: "#f56a00",
                            width: "25px",
                            height: "25px",
                          }}
                          className="capitalize"
                        >
                          {member.charAt(0)}
                        </Avatar>
                      ))}
                    </Avatar.Group>
                    <Link
                      href={`/group/groupTodo/${item._id}`}
                      className="flex gap-1 justify-center items-center border-[1px] border-gray-300 hover:border-gray-400 duration-300 px-2 rounded-lg"
                    >
                      Next
                    </Link>
                  </div>
                </div>
              ))
          : null}
      </div>
    </div>
  );
}

export default GroupPage;
