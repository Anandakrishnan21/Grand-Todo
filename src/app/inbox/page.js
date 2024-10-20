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
    <div className="flex justify-center items-center p-4 pt-0">
      <div className="w-screen lg:w-[80%] flex flex-col gap-2 p-2">
        <div>
          <h1 className="font-bold text-xl">Inbox</h1>
          <span className="text-gray-600 pb-2">{inbox.length} tasks</span>
          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inbox={inbox}
            setPaginationInbox={setPaginationInbox}
          />
        </div>
        {paginationInbox.map((item, index) => (
          <div
            key={index}
            className="text-sm flex flex-col md:flex-row justify-between bg-white border-[1px] border-neutral-300 shadow-sm hover:border-neutral-600 transition-border duration-300 p-2 rounded-md"
          >
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
                <p className="capitalize font-semibold">{item.description}</p>
                <span className="flex gap-1 items-center text-sm">
                  Date: {item.date}
                </span>
                <span className="text-gray-800">{item.tags}</span>
              </div>
            </div>
            <div className="flex gap-2 text-sm items-center">
              <p
                className={`w-20 border-[1px] ${
                  item.priority === "High"
                    ? "border-red-300"
                    : item.priority === "Medium"
                    ? "border-violet-300"
                    : "border-yellow-300"
                } border-[1px] flex justify-center items-center rounded-md p-1`}
              >
                {item.priority}
              </p>
              {item.startTime && (
                <p>
                  Time:{" "}
                  <span>
                    {item.startTime} - {item.endTime}
                  </span>
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InboxPage;
