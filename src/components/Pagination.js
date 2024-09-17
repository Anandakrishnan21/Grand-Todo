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
      <button
        onClick={handleButtonLeft}
        className="p-1 border-[1px] border-r-0 border-gray-500 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out rounded-l-md"
      >
        <AiOutlineLeft />
      </button>
      <div className="p-1 border-t-[1px] border-b-[1px] border-gray-500 text-sm font-bold">
        Task
      </div>
      <button
        onClick={handleButtonRight}
        className="p-1 border-[1px] border-l-0 border-gray-500 active:shadow-[0_3px_10px_rgb(0,0,0,0.2)] transition-shadow duration-300 ease-in-out rounded-r-md"
      >
        <AiOutlineRight />
      </button>
    </div>
  );
}

export default Pagination;
