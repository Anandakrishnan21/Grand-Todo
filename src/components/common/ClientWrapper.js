"use client";

import { useEffect } from "react";
import { redirect, usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import { useSession } from "next-auth/react";
import Header from "./Header";

function ClientWrapper({ children }) {
  const pathname = usePathname();
  const { status } = useSession();

  const showSidebar = [
    "/home",
    "/inbox",
    "/search",
    "/today",
    "/upcoming",
  ].includes(pathname);

  useEffect(() => {
    if (status === "unauthenticated" && showSidebar) {
      redirect("/");
    }
  }, [showSidebar, status]);

  return (
    <div className="flex h-screen">
      {showSidebar && (
        <div className="flex-shrink-0">
          <Sidebar />
        </div>
      )}
      <div className="w-full overflow-auto">
        <Header />
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
}

export default ClientWrapper;
