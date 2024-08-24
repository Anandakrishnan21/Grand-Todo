import React from "react";
import { IoNotificationsCircleOutline } from "react-icons/io5";

function Header() {
  return (
    <div className="flex justify-between z-10 p-2">
      <header className="font-bold">Grand Todo</header>
      <div className="text-blue-500">
        <IoNotificationsCircleOutline size={28} />
      </div>
    </div>
  );
}

export default Header;