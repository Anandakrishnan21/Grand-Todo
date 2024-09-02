"use client";
import { Checkbox, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";

function InboxPage() {
  const [inbox, setInbox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInbox, setPaginationInbox] = useState([]);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/today", {
        cache: "no-cache",
      });
      if (!res.ok) {
        return console.error;
      }
      const data = await res.json();
      setInbox(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginationInbox(inbox.slice(startIndex, endIndex));
  }, [inbox, currentPage]);

  const handleButtonLeft = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1);
    }
  }

  const handleButtonRight = () => {
    if(currentPage < Math.ceil(inbox.length / itemsPerPage)){
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-[60%] h-[60%]">
        <h1 className="font-bold text-xl">Inbox</h1>
        <span className="text-gray-600 pb-2">
          {inbox.length} tasks
        </span>
        <div className="flex justify-end gap-1">
          <button onClick={handleButtonLeft} className="px-2 border-[1px] border-gray-500 rounded-md">L</button>
          <button onClick={handleButtonRight} className="px-2 border-[1px] border-gray-500 rounded-md">R</button>
        </div>
        {paginationInbox.map((item, index) => (
          <div key={index} className="flex justify-between border-b p-2">
            <div className="flex gap-2">
              <RiDraggable size={20} />
              <div className="w-4 h-4 rounded-full border-[1px] border-gray-600"></div>
              <div className="flex flex-col">
                <p>{item.description}</p>
                <span className="text-sm text-gray-600">#inbox</span>
              </div>
            </div>
            <div className="flex gap-2">
              <p>
                {item.priority}
              </p>
              <p>2:00:00 Pm</p>
              <LuAlarmClock size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InboxPage;
