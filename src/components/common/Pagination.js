import React, { useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Pagination({
  itemsPerPage,
  inbox,
  currentPage,
  setCurrentPage,
  setPaginationInbox,
}) {
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
    <div className="flex justify-end">
      <div className="flex gap-1 border-2 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out p-1 rounded-full">
        <button onClick={handleButtonLeft}>
          <AiOutlineLeft />
        </button>
        <div className="text-sm font-bold">Task</div>
        <button onClick={handleButtonRight}>
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
