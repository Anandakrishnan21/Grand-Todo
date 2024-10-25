import React from "react";
import { signOut, useSession } from "next-auth/react";
import Navbar from "./Navbar";
import { Avatar, Popover } from "antd";

function Header() {
  const { data: session } = useSession();

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
          <header className="flex justify-between bg-white items-center gap-4 text-xl z-24 p-2 border-[1px] border-b-neutral-200">
            <p className="font-semibold text-red-500">Grand Todo</p>
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
          </header>
          <Navbar session={session} />
        </div>
      )}
    </>
  );
}

export default Header;
