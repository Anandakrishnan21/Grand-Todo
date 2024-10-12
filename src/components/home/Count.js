import { Flex, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { MdAutoFixHigh } from "react-icons/md";
import { RiProgress1Fill, RiTodoFill } from "react-icons/ri";

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
  console.log(todo);
  console.log(statusCount);

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
      <Progress
        percent={`Todo ` + TodoPercentage}
        percentPosition={{
          align: "start",
          type: "inner",
        }}
        size={[300, 25]}
        strokeColor="#E2E2E2"
      />
      <Progress
        percent={`InProgress ` + InProgressPercentage}
        percentPosition={{
          align: "start",
          type: "inner",
        }}
        size={[300, 25]}
      />
      <Progress
        percent={`Done ` + DonePercentage}
        percentPosition={{
          align: "start",
          type: "inner",
        }}
        size={[300, 25]}
        strokeColor="#B7EB8F"
      />
    </Flex>
  );
}

export default Count;
