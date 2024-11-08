import Image from "next/image";
import React from "react";

function FileNotFound({ width, height, text }) {
  return (
    <>
      <Image
        src="/images/data not found.png"
        width={width}
        height={height}
        alt="data-not-found image"
      />
      <p className="md:text-lg font-medium text-center">{text}</p>
    </>
  );
}

export default FileNotFound;
