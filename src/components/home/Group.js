import React, { useEffect, useState } from "react";
import FileNotFound from "../common/FileNotFound";
import AddGroup from "../common/form/AddGroup";
import { Avatar } from "antd";

function Group() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/group/limit/5", {
          cache: "no-cache",
        });
        if (!res.ok) {
          console.log("Error on fetching the group data");
        }
        const data = await res.json();
        setGroups(data);
      } catch (error) {
        console.error(error);
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
      {groups.length > 0 ? (
        groups.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-[1px] border-gray-200 rounded-lg p-2"
          >
            <div className="flex gap-2 text-sm font-medium items-center">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />
              <p>{item.group}</p>
            </div>
            <Avatar.Group>
              {item.members.map((members, index) => (
                <Avatar
                  key={index}
                  style={{
                    backgroundColor: "#f56a00",
                    width: "25px",
                    height: "25px",
                  }}
                >
                  {members.charAt(0).toUpperCase()}
                </Avatar>
              ))}
            </Avatar.Group>
          </div>
        ))
      ) : (
        <>
          <div className="h-full flex flex-col gap-2 justify-center items-center">
            <FileNotFound
              width="100"
              height="100"
              text="Not Yet created a group"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Group;
