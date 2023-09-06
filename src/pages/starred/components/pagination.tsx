import React from "react";
import Image from "next/image";

function pagination() {
  return (
    <div>
      <div className="flex flex-row items-center">
        <h2 className="text-sirp-peginationtext text-[14px]">1 - 50 of 1000</h2>
        <Image
          src={require("../../../assets/icons/icons-left.svg")}
          alt="documents"
          className="cursor-pointer ml-1"
          width={20}
        />
        <Image
          src={require("../../../assets/icons/chevron-right 1.svg")}
          alt="documents"
          className="cursor-pointer ml-1"
          width={20}
        />
      </div>
    </div>
  );
}

export default pagination;
