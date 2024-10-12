import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { Avatar, Badge, Button, Drawer } from "antd";
import { getSidebarOptions } from "../utils/data";
import { UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import { signOut } from "next-auth/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DrawerComponent({ session, drawerClose, isDrawerVisible }) {
  const segment = useSelectedLayoutSegment();
  const sidebarOptions = getSidebarOptions(segment);

  const active =
    "bg-[#ececec] border-2 font-bold text-blue-800 transition-color duration-300";
  const inactive =
    "text-black hover:bg-[#ececec] transition-color duration-300";

  return (
    <Drawer
      title="Menu"
      placement="left"
      closable={true}
      onClose={drawerClose}
      open={isDrawerVisible}
    >
      <nav className="flex flex-col items-center gap-4">
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
              width: "100%",
            }}
          >
            SignOut
          </Button>
        </div>
      ) : (
        ""
      )}
    </Drawer>
  );
}

export default DrawerComponent;
