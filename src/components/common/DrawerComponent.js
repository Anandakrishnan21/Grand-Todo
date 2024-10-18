import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { getSidebarOptions } from "../utils/data";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DrawerComponent() {
  const segment = useSelectedLayoutSegment();
  const sidebarOptions = getSidebarOptions(segment);

  const active =
    "border-b-4 border-blue-600 font-bold text-blue-800 transition-border duration-300";
  const inactive =
    "text-black hover:bg-[#ececec] transition-color duration-300";

  return (
    <nav className="sticky top-14 bg-white flex md:hidden items-center scrollbar gap-4 z-10 overflow-x-auto py-2">
      <ul className="flex w-full gap-2">
        {sidebarOptions.map((option) => (
          <li key={option.name} className="min-w-[120px]">
            <Link
              href={option.href}
              className={classNames(
                option.current ? active : inactive,
                "group flex items-center gap-x-3 p-2 text-sm tracking-wide leading-6"
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
  );
}

export default DrawerComponent;
