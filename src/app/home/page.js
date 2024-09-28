"use client";
import Component from "@/components/common/ChartSection";
import { useSession } from "next-auth/react";
import React from "react";

function HomePage() {
  const { data: session } = useSession();
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">
          Hi
          {session?.user?.name}, welcome back
        </h1>
        
      </div>
      <Component />
    </div>
  );
}

export default HomePage;
