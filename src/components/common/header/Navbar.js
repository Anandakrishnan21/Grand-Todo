import { useSelectedLayoutSegment } from "next/navigation";
import React from "react";
import { getSidebarOptions } from "../../utils/data";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const segment = useSelectedLayoutSegment();
  const sidebarOptions = getSidebarOptions(segment);

  const active =
    "bg-blue-50 text-blue-800 font-semibold transition-border duration-300";
  const inactive =
    "text-black hover:bg-blue-50 transition-color duration-300";

  return (
    <nav className="sticky top-14 z-24 bg-white flex md:hidden items-center scrollbar gap-4 overflow-x-auto">
      <ul className="flex w-full gap-2 p-1">
        {sidebarOptions.map((option) => (
          <li key={option.name} className="min-w-[120px]">
            <Link
              href={option.href}
              className={classNames(
                option.current ? active : inactive,
                "group border flex items-center justify-center gap-x-3 p-1 text-sm tracking-wide leading-6 rounded-md"
              )}
            >
              <option.icon
                className={
                  option.current
                    ? "h-5 w-5 text-blue-800 shrink-0"
                    : "h-5 w-5 shrink-0"
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

export default Navbar;
