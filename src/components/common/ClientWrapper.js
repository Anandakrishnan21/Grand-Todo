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
    <div className="flex min-h-screen justify-between">
      {showSidebar && <Sidebar />}
      <div className="w-screen">
        <div className="box-border h-screen">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
}

export default ClientWrapper;
