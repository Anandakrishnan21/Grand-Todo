import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import AddTask from "./AddTask";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Badge, Button } from "antd";
import { getSidebarOptions } from "../utils/data";
import { UserOutlined } from "@ant-design/icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const segment = useSelectedLayoutSegment();
  const { data: session } = useSession();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const active =
    "bg-[#ececec] border-2 font-bold text-blue-800 transition-color duration-300";
  const inactive =
    "text-black hover:bg-[#ececec] transition-color duration-300";
  const sidebarOptions = getSidebarOptions(segment);

  return (
    <>
      {!isSmallScreen && (
        <aside className="sticky left-0 top-0 z-10 hidden w-52 flex-col justify-between border-[1px] border-neutral-300 sm:flex h-screen overflow-hidden py-2">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <header className="font-semibold text-red-500">Grand Todo</header>
            <AddTask />
            <ul className="w-full flex flex-col gap-2">
              {sidebarOptions.map((option) => (
                <li key={option.name} className="rounded-lg">
                  <Link
                    href={option.href}
                    className={classNames(
                      option.current ? active : inactive,
                      "group flex items-center gap-x-3 rounded-lg p-2 text-sm tracking-wide leading-6"
                    )}
                  >
                    <option.icon
                      className={
                        option.current
                          ? "h-5 w-5 text-blue-800 shrink-0"
                          : "dark:text-neutral-600 h-5 w-5 shrink-0"
                      }
                    />
                    {option.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          {session?.user ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2">
                <Badge dot color="green">
                  <Avatar shape="square" icon={<UserOutlined />} size={24} />
                </Badge>
                <p className="font-semibold">{session?.user?.name}</p>
              </div>
              <Button
                type="primary"
                danger
                onClick={() => signOut()}
                style={{
                  width: "10rem",
                }}
              >
                SignOut
              </Button>
            </div>
          ) : (
            ""
          )}
        </aside>
      )}
    </>
  );
}

export default Sidebar;
