"use client";
import Loading from "@/app/Loading";
import { CircleX, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Pagination from "../common/button/Pagination";
import FileNotFound from "../common/FileNotFound";
import { Input } from "antd";

function InboxPageContent() {
  const [inbox, setInbox] = useState([]);
  const [input, setInput] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInbox, setPaginationInbox] = useState([]);
  const [filterInbox, setFilterInbox] = useState([]);
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
        setFilterInbox(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const input = e.target.value;
    setInput(input);
    const filter = inbox.filter(
      (item) =>
        item.description.toLowerCase().includes(input.toLowerCase()) ||
        item.priority.toLowerCase().includes(input.toLowerCase()) ||
        item.date.toLowerCase().includes(input.toLowerCase())
    );
    setFilterInbox(filter);
  };

  const handleClear = () => {
    setFilterInbox(inbox);
    setInput("");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="outerDiv">
      <div>
        <h1 className="font-bold text-xl">Inbox</h1>
        <span className="text-gray-600 pb-2">{filterInbox.length} tasks</span>
      </div>
      <Input
        prefix={<Search size={16} color="blue" />}
        placeholder="Search"
        onChange={handleChange}
        value={input}
        suffix={
          input !== "" ? (
            <CircleX
              size={16}
              onClick={handleClear}
              className="cursor-pointer"
            />
          ) : null
        }
      />
      {filterInbox.length > 0 ? (
        <>
          {filterInbox
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((item) => (
              <div
                key={item.id || item.description}
                className="cardDiv text-sm flex justify-between gap-2 p-4"
              >
                <div className="flex gap-2 items-center">
                  <div
                    className={`${
                      item.status === "Done"
                        ? "border-green-500"
                        : item.status === "Inprogress"
                        ? "border-violet-500"
                        : "border-gray-500"
                    } w-4 h-4 rounded-full border-[2px] cursor-pointer p-2`}
                  />
                </div>
                <div className="w-full flex flex-row gap-2 text-sm justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="capitalize font-medium">{item.description}</p>
                    <span className="flex gap-1 items-center text-sm">
                      Date: {item.date}
                    </span>
                    <span className="text-neutral-500">{item.tags}</span>
                    {item.startTime && (
                      <p className="date">
                        {item.startTime} - {item.endTime}
                      </p>
                    )}
                  </div>
                  <p className="text-blue-800 font-medium">{item.priority}</p>
                </div>
              </div>
            ))}
          <Pagination
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            inbox={filterInbox}
            setPaginationInbox={setPaginationInbox}
          />
        </>
      ) : (
        <div className="fileNotFound">
          <FileNotFound width="200" height="200" text="Todo not found" />
        </div>
      )}
    </div>
  );
}

export default InboxPageContent;
