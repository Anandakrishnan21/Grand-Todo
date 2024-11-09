import React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import AddTask from "./form/AddTask";
import { signOut, useSession } from "next-auth/react";
import { Avatar, Badge, Button } from "antd";
import { getSidebarOptions } from "../utils/data";
import { HiOutlineLogout } from "react-icons/hi";
import { UserOutlined } from "@ant-design/icons";
import { useSidebarContext } from "@/context/SidebarContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Sidebar() {
  const segment = useSelectedLayoutSegment();
  const { isLargeOpen, isSmallOpen } = useSidebarContext();
  const { data: session } = useSession();

  const commonClasses =
    "flex flex-col overflow-y-auto scrollbar-hidden bg-neutral-50 dark:bg-neutral-950 dark:border-r-neutral-800 dark:border-[1px] p-4";
  const active =
    "bg-blue-50 text-blue-800 font-semibold transition-border duration-300 border";
  const inactive = "text-black hover:bg-blue-50 transition-color duration-300";

  const sidebarOptions = getSidebarOptions(segment);

  return (
    <>
      <aside
        className={`${commonClasses} hidden md:flex sticky top-0 justify-between z-10 border-[1px] border-neutral-300 shadow-sm dark:shadow-neutral-800 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <ul className="flex flex-col gap-3 w-full">
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current ? active : inactive,
                  "group flex items-center justify-center gap-x-3 rounded-md p-2 text-sm tracking-wide leading-6"
                )}
              >
                <option.icon
                  className={
                    option.current
                      ? "h-5 w-5 shrink-0"
                      : "text-neutral-800 dark:text-neutral-600 h-5 w-5 shrink-0"
                  }
                />
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-3">
          <Link
            href=""
            onClick={() => signOut()}
            className="group flex justify-center gap-x-3 rounded-md p-2 text-sm tracking-wide leading-6 bg-red-500 text-white"
          >
            <HiOutlineLogout className="w-5 h-5" />
          </Link>
        </ul>
      </aside>
      <aside
        className={`flex flex-col justify-between z-20 md:z-10 w-56 transition-width border-[1px] border-neutral-300 shadow-sm duration-300 dark:shadow-neutral-800 lg:sticky absolute top-0 p-2 gap-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${
          isSmallOpen
            ? "flex h-screen max-h-screen pt-0 md:pt-[72px]"
            : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-3 w-full">
          <div className="logoDiv">
            {/* <LogoImage />
            <X className="closeBtn" onClick={toggleSidebar} /> */}
          </div>
          <li className="font-semibold text-lg text-red-500 text-center">Grand Todo</li>
          <AddTask />
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current ? active : inactive,
                  "group flex items-center gap-x-3 rounded-md p-2 text-sm tracking-wide leading-6"
                )}
              >
                <option.icon
                  className={
                    option.current ? "h-5 w-5 shrink-0" : "h-5 w-5 shrink-0"
                  }
                />
                {option.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col gap-3">
          <li>
            <p className="flex items-center justify-center bg-blue-50 text-blue-600 border text-sm font-bold capitalize p-1 gap-2 rounded-md">
              <Avatar
                style={{
                  backgroundColor: "#1677ff",
                }}
                icon={<UserOutlined />}
              />
              {session?.user?.name}
            </p>
          </li>
          <Button
            type="primary"
            danger
            onClick={() => signOut()}
            style={{
              width: "100%",
            }}
          >
            SignOut
          </Button>
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;
