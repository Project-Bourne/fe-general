import React, { useState } from "react";
import Image from "next/image";

type HeaderIconTwoProps = {
  activeOption?: string;
  onOptionChange?: any;
  onClick?: any;
};

function HeadIconTwo({
  activeOption,
  onOptionChange,
  onClick,
}: HeaderIconTwoProps) {
  const [div1TextColor, setDiv1TextColor] = useState("black");
  const [div2TextColor, setDiv2TextColor] = useState("black");
  const [activeDiv, setActiveDiv] = useState(activeOption);

  const toggleOption = (option) => {
    setActiveDiv(option);
    onOptionChange(option);
  };

  return (
    <div className="flex head-icon-2 items-center gap-38 border-b-2">
      <div
        onClick={() => toggleOption("All")}
        className={`cursor-pointer ml-2 flex gap-2 p-2 ${
          activeDiv !== "New"
            ? "border-b-2 border-sirp-primary w-[15rem]"
            : "border-b-2 border-transparent w-[15rem]"
        }`}
      >
        <Image
          src={
            activeDiv == "All"
              ? require(`../../../assets/icons/on.template.svg`)
              : require(`../../../assets/icons/template 1.svg`)
          }
          alt="documents"
          className="cursor-pointer ml-2 text-green-500"
          width={20}
          style={{
            fill: activeDiv === "All" ? "text-red-500" : "text-green-500",
          }}
        />
        <a className="group transition-all duration-300 ease-in-out">
          <span className={`${activeDiv === "All" ? "text-sirp-primary" : ""}`}>
            All
          </span>
        </a>
      </div>
      <div
        onClick={() => toggleOption("New")}
        className={`cursor-pointer ml-2 flex gap-2 p-2 ${
          activeDiv === "New"
            ? "border-b-2 border-sirp-primary w-[15rem]"
            : "border-b-2 border-transparent w-[15rem]"
        }`}
      >
        <Image
          src={
            activeDiv == "New"
              ? require(`../../../assets/icons/onNewCycle.svg`)
              : require(`../../../assets/icons/newCycle.svg`)
          }
          alt="documents"
          className="cursor-pointer ml-2"
          width={20}
        />
        <a className="group transition-all duration-300 ease-in-out">
          <span className={`${activeDiv === "New" ? "text-sirp-primary" : ""}`}>
            New
          </span>
        </a>
      </div>
    </div>
  );
}

export default HeadIconTwo;
