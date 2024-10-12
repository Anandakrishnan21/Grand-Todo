import React from "react";
import { ProgressComponent } from "./Progress";
import Link from "next/link";

function ProgressSection({ todo }) {
  return (
    <div className="w-full flex flex-col border-2 border-neutral-300 rounded-md p-4">
      <h1 className="text-lg font-semibold">Daily UnCompleted Tasks</h1>
      <div className="flex justify-center items-center text-sm md:text-base">
        <div>
          <div className="flex items-center gap-1">
            <div className="bg-blue-600 w-3 h-3 rounded-full" />
            <p>Uncompleted percentage</p>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-neutral-300 w-3 h-3 rounded-full" />
            <p>Total percentage</p>
          </div>
          <Link href="/today" className="text-blue-800 underline">
            Complete your task
          </Link>
        </div>
        <ProgressComponent todo={todo} />
      </div>
    </div>
  );
}

export default ProgressSection;
