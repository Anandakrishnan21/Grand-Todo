import React from "react";
import DrawerComponent from "./DrawerComponent";
import { useSession } from "next-auth/react";

function Header() {
  const { data: session } = useSession();
  
  return (
    <>
      {session && (
        <div className="top-0 sticky">
          <header className="flex md:hidden bg-white items-center gap-4 text-xl z-10 p-4 border-[1px] border-b-neutral-200">
            <p className="font-semibold text-red-500">Grand Todo</p>
          </header>
          <DrawerComponent session={session} />
        </div>
      )}
    </>
  );
}

export default Header;
