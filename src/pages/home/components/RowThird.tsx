import Image from "next/image";
import PolarChartComponent from "../charts/polar";

import info from "../../../assets/icons/info.svg";
import { article_categories } from "@/utils/reports.constants";

function ThirdRow() {
  const LeftHandDisplay = () => {
    return (
      <div className="grid w-full rounded-xl bg-white">
        {/* header  */}
        <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-8 py-3  md:py-5">
          {/* header text rhs  */}
          <div>
            <h3 className="md:text-[14px] text-[12px] font-light md:tracking-[.7px]">
              ARTICLE CONFIDENCE
            </h3>
            <h3 className="md:text-[14px] text-[12px]  font-normal md:tracking-[.7px]">
              Average confidence level of articles crawled
            </h3>
          </div>
          {/* header text lhs  */}
          <div className="flex items-start ">
            <Image
              src={info}
              alt="info"
              height={25}
              width={25}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey h-[300px]">
          <div className="flex justify-center h-[350px] w-[75%] mx-auto">
            <PolarChartComponent />
          </div>
        </div>
      </div>
    );
  };

  const RightHandDisplay = () => {
    return (
      <div className="grid rounded-xl bg-white">
        {/* header  */}
        <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-8 py-3  md:py-5 ">
          {/* header text rhs  */}
          <div>
            <h3 className="md:text-[14px] text-[12px] font-light md:tracking-[.7px]">
              ARTICLE CARTEGORIES
            </h3>
            <h3 className="md:text-[14px] text-[12px]  font-normal md:tracking-[.7px]">
              Keywords of articles crawled
            </h3>
          </div>
          {/* header text lhs  */}
          <div className="flex items-start">
            <Image
              src={info}
              alt="info"
              height={25}
              width={25}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey h-[300px]">
          <div className=" flex flex-wrap gap-x-1.5 gap-y-4 h-[270px] md:py-5 md:px-8 p-3 overflow-y-auto">
            {article_categories.map((category, index) => (
              <div
                key={index}
                className="md:text-[14px] text-[12px] font-light rounded-xl px-2 md:px-4 py-1 md:py-1.5 border-[1.3px] border-[#A2E2F6] bg-[#E8F8FD]"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 rounded-xl">
      <LeftHandDisplay />
      <RightHandDisplay />
    </div>
  );
}

export default ThirdRow;
