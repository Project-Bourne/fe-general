import React from "react";
import Link from "next/link"; // Import the Link component
import Image from "next/image";

function AddContentHeader() {
  return (
    <>
      <div className="py-5 mx-5">
        <Link href="../">
          <Image
            src={require("../../../assets/icons/arrow-narrow-left 1.svg")}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
        </Link>

        <h1 className="text-black text-xl">Add Content</h1>
      </div>
    </>
  );
}

export default AddContentHeader;
