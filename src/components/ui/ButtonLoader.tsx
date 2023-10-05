import React from "react";

type LoaderProps = {
  height: string;
  width: string;
  borderWidth: string;
  borderTopWidth: string;
  borderTopColor: string;
};

const ButtonLoader = ({
  height,
  width,
  borderTopWidth,
  borderTopColor,
  borderWidth,
}: LoaderProps) => {
  return (
    <div
      className="rounded-full animate-spin"
      style={{
        height,
        width,
        borderWidth,
        borderTopWidth,
        borderTopColor,
      }}
    ></div>
  );
};

export default ButtonLoader;