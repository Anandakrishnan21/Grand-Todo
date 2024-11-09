import React from "react";
import { ProgressComponent } from "./Progress";
import Link from "next/link";

function ProgressSection({ todo }) {
  return (
    <div className="w-full md:w-1/2 h-full md:h-60 flex flex-col bg-white border-[1px] border-[#dbdbdb] rounded-lg p-4">
      <h1 className="flex font-semibold">Daily UnCompleted Tasks</h1>
      <div className="flex flex-col-reverse md:flex-row justify-center items-center text-sm md:text-base">
        <div className="w-full flex flex-col text-sm gap-2">
          <div className="flex items-center gap-1">
            <div className="bg-blue-600 w-3 h-3 rounded-full" />
            <p>Uncompleted percentage</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-neutral-300 w-3 h-3 rounded-full" />
            <p>Total percentage</p>
          </div>
          <Link href="/today" className="w-1/2 border text-sm bg-blue-50 text-blue-600 p-1 rounded-lg">
            Complete your task
          </Link>
        </div>
        <ProgressComponent todo={todo} />
      </div>
    </div>
  );
}

export default ProgressSection;
