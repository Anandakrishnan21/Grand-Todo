import React, { useEffect, useState } from "react";
import FileNotFound from "../common/FileNotFound";
import AddGroup from "../common/form/AddGroup";
import { Avatar, Spin } from "antd";
import { useSession } from "next-auth/react";
import DeleteIcon from "../common/button/DeleteIcon";

function Group() {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/group/limit/5", { cache: "no-cache" });
        if (!res.ok) throw new Error("Failed to fetch group data");

        const data = await res.json();
        setGroups(data);
      } catch (error) {
        console.error("Error fetching groups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cardGrp">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold">Recent Groups</h1>
        <AddGroup />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center py-4">
          <Spin size="large" />
        </div>
      ) : groups.length > 0 ? (
        groups
          .filter(
            (group) =>
              group.members.includes(session?.user?.email) ||
              group.admin === session?.user?.name
          )
          .map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-[1px] border-gray-200 rounded-lg p-2"
            >
              <div className="flex gap-2 text-sm font-medium items-center capitalize">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <p>{item.group}</p>
              </div>
              <div className="flex gap-2 items-center">
                <Avatar.Group>
                  {item.members.map((member, index) => (
                    <Avatar
                      key={index}
                      style={{
                        backgroundColor: "#f56a00",
                        width: "25px",
                        height: "25px",
                      }}
                    >
                      {member.charAt(0).toUpperCase()}
                    </Avatar>
                  ))}
                </Avatar.Group>
                {item.email === session?.user?.email && (
                  <DeleteIcon setGroups={setGroups} id={item._id} />
                )}
              </div>
            </div>
          ))
      ) : (
        <div className="h-full flex flex-col gap-2 justify-center items-center">
          <FileNotFound
            width="100"
            height="100"
            text="Not Yet created a group"
          />
        </div>
      )}
    </div>
  );
}

export default Group;
