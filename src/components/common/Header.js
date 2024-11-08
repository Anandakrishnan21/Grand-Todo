"use client";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { Avatar, Popover } from "antd";
import AddTask from "./AddTask";
import Notification from "./Notification";

function Header() {
  const [todo, setTodo] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (res.ok) {
          const data = await res.json();
          setTodo(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const content = (
    <div className="w-40 flex flex-col items-center font-medium cursor-pointer gap-1">
      <p>My account</p>
      <p className="w-full hover:bg-blue-50 hover:border p-1 rounded-md">
        {session?.user?.name}
      </p>
      <p
        className="w-full hover:bg-blue-50 hover:border p-1 rounded-md"
        onClick={() => signOut()}
      >
        SignOut
      </p>
    </div>
  );

  return (
    <>
      {session && (
        <div className="top-0 sticky z-20">
          <header className="flex justify-between items-center bg-white gap-4 text-xl z-24 p-2 border-b-[1px] border-neutral-200">
            <p className="flex md:hidden font-semibold text-red-500">
              Grand Todo
            </p>
            <div className="flex items-center ml-auto gap-4">
              <div className="lg:hidden">
                <AddTask />
              </div>
              <Popover content={content}>
                <Avatar
                  style={{
                    backgroundColor: "#1677ff",
                  }}
                  gap={2}
                >
                  {session?.user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </Popover>
              <Notification todo={todo} />
            </div>
          </header>
          <Navbar session={session} />
        </div>
      )}
    </>
  );
}

export default Header;
