import React from "react";
import { Flex, Spin } from "antd";

function Loading() {
  return (
    <Flex align="center" justify="center" gap="middle" style={{
        height: "700px",
    }}>
      <Spin size="large" />
    </Flex>
  );
}

export default Loading;
