"use client";
import Pagination from "@/components/common/Pagination";
import { Inbox } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuAlarmClock } from "react-icons/lu";
import { RiDraggable } from "react-icons/ri";
import Loading from "../Loading";

function InboxPage() {
  const [inbox, setInbox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInbox, setPaginationInbox] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const res = await fetch("/api/today", {
          cache: "no-cache",
        });
        if (!res.ok) {
          return console.error("error fetching data");
        }
        const data = await res.json();
        setInbox(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center pt-4">
      <div className="w-screen lg:w-[60%] lg:h-[60%] p-2">
        <h1 className="font-bold text-xl">Inbox</h1>
        <span className="text-gray-600 pb-2">{inbox.length} tasks</span>
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          inbox={inbox}
          setPaginationInbox={setPaginationInbox}
        />
        {paginationInbox.map((item, index) => (
          <div key={index} className="flex justify-between border-b-[2px] p-2">
            <div className="flex gap-2 items-center">
              <RiDraggable size={20} />
              <div
                className={`${
                  item.status === "Done"
                    ? "border-green-500"
                    : item.status == "Inprogress"
                    ? "border-violet-500"
                    : "border-gray-500"
                } w-4 h-4 rounded-full border-[2px] cursor-pointer p-2`}
              />
              <div className="flex flex-col">
                <p>{item.description}</p>
                <span className="flex gap-1 items-center text-sm text-gray-600">
                  <Inbox size={16} /> inbox
                </span>
                <span className="text-sm text-gray-800">{item.tags}</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <p
                className={`${
                  item.priority === "high"
                    ? "text-red-500"
                    : item.priority === "Medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                } rounded-md px-1`}
              >
                {item.priority}
              </p>
              <p className="text-sm">{item.due}</p>
              <LuAlarmClock />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InboxPage;
