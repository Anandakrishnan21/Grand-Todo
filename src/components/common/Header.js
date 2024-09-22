import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import DrawerComponent from "./DrawerComponent";
import { useSession } from "next-auth/react";
import AddTask from "./AddTask";

function Header() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const { data: session } = useSession();
  const drawerClose = () => {
    setIsDrawerVisible(false);
  };
  return (
    <header className="flex lg:hidden items-center gap-4 text-xl z-10 p-2 border-[1px] border-b-neutral-200">
      <IoIosMenu size={20} onClick={() => setIsDrawerVisible(true)} />
      <p className="font-semibold text-red-500">Grand Todo</p>
      <DrawerComponent
        session={session}
        isDrawerVisible={isDrawerVisible}
        drawerClose={drawerClose}
      />
      <AddTask />
    </header>
  );
}

export default Header;
