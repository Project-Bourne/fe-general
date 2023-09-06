import React, { useState } from "react";
import Image from "next/image";

function AddContentHeaderTwo() {
  const [div1TextColor, setDiv1TextColor] = useState("black");
  const [div2TextColor, setDiv2TextColor] = useState("black");
  const [activeDiv, setActiveDiv] = useState(0);

  const toggleDiv1Color = () => {
    setDiv1TextColor("blue");
    setDiv2TextColor("black");
    setActiveDiv(1);
  };

  const toggleDiv2Color = () => {
    setDiv1TextColor("black");
    setDiv2TextColor("blue");
    setActiveDiv(2);
  };

  return (
    <div className="flex items-center gap-38 border-b-2 mt-[5rem]">
      <div
        onClick={toggleDiv1Color}
        className={`cursor-pointer ml-2 flex gap-2 p-2 ${
          activeDiv === 1
            ? "border-b-2 border-sirp-primary w-[15rem]"
            : "border-b-2 border-transparent w-[15rem]"
        }`}
      >
        <Image
          src={
            activeDiv === 1
              ? require(`../../../assets/icons/Histroy.svg`)
              : require(`../../../assets/icons/on.Histroy.svg`)
          }
          alt="documents"
          className="cursor-pointer ml-2"
          width={20}
          style={{ fill: "yellow" }}
        />
        <a className="group transition-all duration-300 ease-in-out">
          <span
            className="text-sirp-primary active:text-blue-600 text-lg font-semibold"
            style={{ color: div1TextColor }}
          >
            History
          </span>
        </a>
      </div>
      <div
        onClick={toggleDiv2Color}
        className={`cursor-pointer ml-2 flex gap-2 p-2 ${
          activeDiv === 2
            ? "border-b-2 border-sirp-primary w-[15rem]"
            : "border-b-2 border-transparent w-[15rem]"
        }`}
      >
        <Image
          src={
            activeDiv === 1
              ? require(`../../../assets/icons/starred.svg`)
              : require(`../../../assets/icons/on.starred.svg`)
          }
          alt="documents"
          className="cursor-pointer ml-2"
          width={20}
        />
        <a className="group transition-all duration-300 ease-in-out">
          <span
            className="text-sirp-primary active:text-blue-600 text-lg font-semibold"
            style={{ color: div2TextColor }}
          >
            Saved
          </span>
        </a>
      </div>
    </div>
  );
}

export default AddContentHeaderTwo;
