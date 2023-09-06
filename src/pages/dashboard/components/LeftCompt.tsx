import React from "react";
import Image from "next/image";

function LeftCompt() {
  return (
    <div className="capitalize col-span-1 ml-0 bg-sirp-dashboardcola drop-shadow-md min-h-28 flex flex-wrap justify-start px-8 py-4 items-center rounded-[1.5rem] basis-1/2 gap-x-[2.5rem]">
      {/* dashbaord card 1  */}
      <div className="flex flex-col justify-center h-[70px] min-w-[45%]">
        <div className="flex flex-row items-center gap-2">
          <div>
            <Image
              src={require("../../../assets/icons/frame-01.svg")}
              alt="documents"
              className="cursor-pointer"
              width={50}
            />
          </div>
          <div>
            <p className="font-bold text-black">4000</p>
            <span className="font-light text-black text-[14px] md:text-[16px]">
              Total documents
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-[70px] min-w-[45%]">
        <div className="flex items-center gap-2 h-28 border-opacity-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-02.svg")}
              alt="expor-collab"
              className="cursor-pointer"
              width={50}
            />
          </div>
          <div>
            <p className="font-bold text-black">4000</p>
            <span className="font-light text-black text-[14px] md:text-[16px]">
              Total export to collab
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftCompt;
