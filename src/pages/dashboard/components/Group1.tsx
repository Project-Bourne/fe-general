import React from "react";
import Image from "next/image";

function Group1() {
  return (
    <div className="flex justify-start items-start md:justify-evenly flex-row flex-wrap gap-x-5 md:gap-x-0">
      {/* group 1  */}

      <div className="border mx-auto md:mx-0  border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-07.svg")}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey text-titl">
              Total Exports to Collab
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Collab Workspace
          </button>
        </div>
      </div>
      {/* group 2   */}
      <div className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-08.svg")}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey">
              Total Documents Analyzed
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Analyzer
          </button>
        </div>
      </div>
      <div className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-09.svg")}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey">
              Total Documents Summarized
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Interrogator
          </button>
        </div>
      </div>
      <div className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-0100.svg")}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="font-light text-sirp-grey">Total Documents</span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Translator
          </button>
        </div>
      </div>
      {/* group 3  */}
      <div className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-011.svg")}
              alt="documents"
              className=" cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey">
              Total Documents Fact-Checked
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Fact Checker
          </button>
        </div>
      </div>
      <div className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-012.svg")}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey">
              Total Documents Summarized
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Summarizer
          </button>
        </div>
      </div>
      <div className="border mx-auto md:mx-0 border-sirp-dashbordb1 rounded-[1.5rem] bg-sirp-secondary2  h-[12rem] mt-5  p-3">
        <div className="flex flex-row items-center gap-3 pt-5">
          <div>
            <Image
              src={require("../../../assets/icons/frame-013.svg")}
              alt="documents"
              className="cursor-pointer"
              width={100}
            />
          </div>
          <div>
            <p className="font-bold">4000</p>
            <span className="capitalize font-light text-sirp-grey">
              Total Documents
            </span>
          </div>
        </div>
        <div className="pt-8 ">
          <button className="capitalize border border-sirp-dashboardcola w-[20rem] pb-2 pt-2 rounded-[1rem] hover:bg-sirp-dashboardcola hover:text-white text-sirp-dashboardcola font-bold">
            Open Oracle
          </button>
        </div>
      </div>
    </div>
  );
}

export default Group1;
