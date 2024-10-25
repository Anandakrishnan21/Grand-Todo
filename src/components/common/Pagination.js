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
    <div className="flex justify-center text-sm gap-1">
      <button
        onClick={handleButtonLeft}
        className={`${
          currentPage === 1 ? "text-neutral-500" : "hover:border-blue-500 transition-colors duration-300"
        } border-[1px] border-[#dbdbdb] shadow-sm p-1 px-2 rounded-md`}
      >
        Prev
      </button>
      <button
        onClick={handleButtonRight}
        className={`${
          currentPage < Math.ceil(inbox.length / itemsPerPage)
            ? "hover:border-blue-500 transition-colors duration-300"
            : "text-neutral-500"
        } border-[1px] border-[#dbdbdb] shadow-sm p-1 px-2 rounded-md`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
