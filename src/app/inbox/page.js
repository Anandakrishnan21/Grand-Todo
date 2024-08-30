"use client";
import { Card } from "antd";
import React, { useEffect, useState } from "react";

function InboxPage() {
  const [inbox, setInbox] = useState([]);
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

  return (
    <div className="flex flex-col gap-2 p-2">
      {inbox.map((data, index) => (
        <Card key={index}>
          <div className="flex">
            <p>{data.description}</p>
            <p>{data.date}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default InboxPage;
