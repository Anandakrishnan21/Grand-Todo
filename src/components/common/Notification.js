"use client";
import { Popover } from "antd";
import {
  LucideArrowDownWideNarrow,
  LucideArrowUpWideNarrow,
} from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";

function Notification({ todo }) {
  const [filteredTodo, setFilteredTodo] = useState([]);
  const [open, setOpen] = useState(false);

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const today = new Date();
  const formattedDate =
    String(today.getDate()).padStart(2, "0") +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    today.getFullYear();

  useEffect(() => {
    const checkNotification = () => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(
        now.getMinutes()
      ).padStart(2, "0")}`;

      const dueNotification = todo.filter(
        (item) =>
          item.date === formattedDate &&
          item.notificationTime &&
          item.notificationTime <= currentTime
      );
      setFilteredTodo(dueNotification);
    };

    checkNotification();
    const interval = setInterval(checkNotification, 1000);
    return () => clearInterval(interval);
  }, [todo, formattedDate]);

  const content = (
    <div className="w-72 flex flex-col font-medium cursor-pointer gap-1 p-2">
      {filteredTodo.length > 0 ? (
        filteredTodo.map((item, index) => (
          <div key={item._id} className="flex items-center justify-between text-sm">
            {item.priority === "High" ? (
              <LucideArrowUpWideNarrow size={16} className="text-red-600" />
            ) : item.priority === "Medium" ? (
              <LucideArrowUpWideNarrow size={16} className="text-yellow-600" />
            ) : (
              <LucideArrowDownWideNarrow size={20} className="text-green-600" />
            )}
            <p key={index}>{item.description}</p>
            <span className="text-neutral-400">{item.date}</span>
          </div>
        ))
      ) : (
        <div className="flex items-center gap-1">
          <Image
            src="/images/inbox.png"
            width="100"
            height="100"
            alt="msg-not-found image"
          />
          <p>Message not found</p>
        </div>
      )}
    </div>
  );

  return (
    <Popover
      content={content}
      title="Notification"
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      className="mr-10"
    >
      <div className="relative hover:bg-blue-100 rounded-md transition-colors duration-200 p-1">
        <IoNotificationsOutline />
        {filteredTodo.length ? (
          <span className="absolute h-2 w-2 rounded-full top-0 right-1 bg-green-500" />
        ) : null}
      </div>
    </Popover>
  );
}

export default Notification;
