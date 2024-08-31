"use client";
import { Checkbox, Pagination } from "antd";
import React, { useEffect, useState } from "react";

function InboxPage() {
  const [inbox, setInbox] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationInbox, setPaginationInbox] = useState([]);
  const itemsPerPage = 15;

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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col items-center text-sm font-medium leading-none gap-2 p-2">
      <h2 className="w-[80%] items-start font-semibold text-lg">Inbox</h2>
      {paginationInbox.map((data, index) => (
        <div
          key={index}
          className="w-[80%] flex gap-2 items-center bg-stone-100 p-1 rounded-md"
        >
          <div>
            <Checkbox/>
          </div>
          <p className="w-60">{data.description}</p>
          <p>{data.assignee}</p>
          <p>{data.priority}</p>
        </div>
      ))}
      {/* <Pagination
        current={currentPage}
        total={inbox.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      /> */}
    </div>
  );
}

export default InboxPage;
