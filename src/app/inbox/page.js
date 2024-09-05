"use client";
import { Checkbox, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import {
  AiOutlineClockCircle,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import { LuAlarmClock } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";

function InboxPage() {
  const [inbox, setInbox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInbox, setPaginationInbox] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          return console.error;
        }
        const data = await res.json();
        setInbox(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginationInbox(inbox.slice(startIndex, endIndex));
  }, [inbox, currentPage]);

  const handleButtonLeft = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleButtonRight = () => {
    if (currentPage < Math.ceil(inbox.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[60%] h-[60%]">
        <h1 className="font-bold text-xl">Inbox</h1>
        <span className="text-gray-600 pb-2">{inbox.length} tasks</span>
        <div className="flex justify-end">
          <button
            onClick={handleButtonLeft}
            className="p-1 border-[1px] border-r-0 border-gray-500 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out rounded-l-md"
          >
            <AiOutlineLeft />
          </button>
          <div className="p-1 border-t-[1px] border-b-[1px] border-gray-500 text-sm font-bold">Task</div>
          <button
            onClick={handleButtonRight}
            className="p-1 border-[1px] border-l-0 border-gray-500 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out rounded-r-md"
          >
            <AiOutlineRight />
          </button>
        </div>
        {paginationInbox.map((item, index) => (
          <div key={index} className="flex justify-between border-b p-2">
            <div className="flex gap-2 items-center">
              <RiDraggable size={20} />
              <div
                className={`w-4 h-4 rounded-full border-[2px] border-violet-600`}
              ></div>
              <div className="flex flex-col">
                <p>{item.description}</p>
                <span className="text-sm text-gray-600">#inbox</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p
                className={`${
                  item.priority === "high"
                    ? "bg-red-100"
                    : item.priority === "Medium"
                    ? "bg-yellow-100"
                    : "bg-green-100"
                } rounded-md px-1`}
              >
                {item.priority}
              </p>
              <p className="text-sm">2:00:00 Pm</p>
              <AiOutlineClockCircle />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InboxPage;
