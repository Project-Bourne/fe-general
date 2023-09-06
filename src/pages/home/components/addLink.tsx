import React from "react";
import Image from "next/image";
import Link from "next/link";

function AddLink() {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Perform navigation to another page here
      window.location.href = "../metadata/metadata";
    }
  };

  const handleClick = () => {
    // Perform navigation to another page here
    window.location.href = "../metadata/metadata";
  };

  return (
    <div>
      <div className="flex border-2 border-dotted border-black items-center p-3 mx-5 gap-2 rounded-[1rem] mt-10">
        <Image
          src={require("../../../assets/icons/Link.svg")}
          alt="documents"
          className="cursor-pointer"
          width={30}
          onClick={handleClick}
        />
        <input
          type="search"
          name="input"
          id="input"
          placeholder="Copy and Paste link here"
          className="border-none outline-none bg-transparent text-1xl w-[100%]"
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}

export default AddLink;
