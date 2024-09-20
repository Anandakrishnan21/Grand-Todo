"use client";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import { useSelectedLayoutSegment } from "next/navigation";
import {
  AiOutlineCalendar,
  AiOutlineDashboard,
  AiOutlineInbox,
  AiOutlineSearch,
} from "react-icons/ai";
import AddTask from "./AddTask";
import { signOut, useSession } from "next-auth/react";
import { Button } from "antd";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const segment = useSelectedLayoutSegment();
  const { data: session } = useSession();

  const sidebarOptions = [
    {
      name: "Dashboard",
      href: "/home",
      icon: AiOutlineDashboard,
      current: segment == "home",
    },
    {
      name: "Inbox",
      href: "/inbox",
      icon: AiOutlineInbox,
      current: segment === "inbox",
    },
    {
      name: "Search",
      href: "/search",
      icon: AiOutlineSearch,
      current: segment === "search",
    },
    {
      name: "Today",
      href: "/today",
      icon: AiOutlineCalendar,
      current: segment === "today",
    },
    {
      name: "Upcoming",
      href: "/upcoming",
      icon: AiOutlineCalendar,
      current: segment === "upcoming",
    },
  ];

  const active =
    "bg-[#ececec] font-bold text-blue-800 transition-color duration-300";
  const inactive =
    "text-black hover:bg-[#ececec] transition-color duration-300";

  return (
    <aside className="sticky left-0 top-0 z-10 hidden w-52 flex-col justify-between border-[1px] border-neutral-300 sm:flex h-screen overflow-hidden py-2">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Header />
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
      <div className="flex flex-col items-center justify-center">
        <p className="font-semibold">{session?.user?.name}</p>
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
    </aside>
  );
}

export default Sidebar;
