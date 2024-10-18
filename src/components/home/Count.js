import { Flex, Progress } from "antd";
import React, { useEffect, useState } from "react";

function Count({ todo }) {
  const [statusCount, setStatusCount] = useState([]);
  useEffect(() => {
    const counts = {
      Todo: 0,
      InProgress: 0,
      Done: 0,
    };
    todo.forEach((task) => {
      if (task.status === "Todo") counts.Todo++;
      if (task.status === "Inprogress") counts.InProgress++;
      if (task.status === "Done") counts.Done++;
    });

    setStatusCount(counts);
  }, [todo]);

  const totalCount = todo.length;

  const TodoPercentage = totalCount
    ? Math.round((statusCount.Todo / totalCount) * 100)
    : 0;
  const InProgressPercentage = totalCount
    ? Math.round((statusCount.InProgress / totalCount) * 100)
    : 0;
  const DonePercentage = totalCount
    ? Math.round((statusCount.Done / totalCount) * 100)
    : 0;

  return (
    <Flex gap="small" vertical>
      <div>
        <p className="text-sm font-semibold">Todo</p>
        <Progress
          percent={TodoPercentage}
          percentPosition={{
            align: "start",
            type: "inner",
          }}
          size={[300, 20]}
          strokeColor="rgb(239 68 68)"
        />
      </div>
      <div>
        <p className="text-sm font-semibold">InProgress</p>
        <Progress
          percent={InProgressPercentage}
          percentPosition={{
            align: "start",
            type: "inner",
          }}
          size={[300, 20]}
          strokeColor="rgb(139 92 246)"
        />
      </div>
      <div>
        <p className="text-sm font-semibold">Done</p>
        <Progress
          percent={DonePercentage}
          percentPosition={{
            align: "start",
            type: "inner",
          }}
          size={[300, 20]}
          strokeColor="rgb(34 197 94)"
        />
      </div>
    </Flex>
  );
}

export default Count;
