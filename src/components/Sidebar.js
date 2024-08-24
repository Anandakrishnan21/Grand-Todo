"use client";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import { Calendar, Home, Inbox, PlusCircle, Search } from "lucide-react";
import { IoToday } from "react-icons/io5";
import { useSelectedLayoutSegment } from "next/navigation";
import AddTask from "./AddTask";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const segment = useSelectedLayoutSegment();

  const sidebarOptions = [
    {
      name: "Home",
      href: "/home",
      icon: Home,
      current: !segment || segment == "home",
    },
    {
      name: "Inbox",
      href: "/inbox",
      icon: Inbox,
      current: segment === "inbox",
    },
    {
      name: "Search",
      href: "/search",
      icon: Search,
      current: segment === "search",
    },
    {
      name: "Today",
      href: "/today",
      icon: IoToday,
      current: segment === "today",
    },
    {
      name: "Upcoming",
      href: "/upcoming",
      icon: Calendar,
      current: segment === "upcoming",
    },
  ];

  const active =
    "bg-[#ececec] font-bold text-blue-500 transition-color duration-300";
  const inactive =
    "text-black hover:bg-[#ececec] transition-color duration-300";

  return (
    <aside className="z-10 hidden w-52 flex-col border-[1px] border-neutral-300 sm:flex">
      <Header />
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
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
                      ? "h-5 w-5 shrink-0"
                      : "dark:text-neutral-600 h-5 w-5 shrink-0"
                  }
                />
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
