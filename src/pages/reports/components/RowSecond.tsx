import Image from "next/image";
import { PolarChartComponent } from "../charts";
import { article_sources } from "../constants";
import ProgressBar from "@/components/ui/ProgressBar";

function SecondRow() {
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
              src={require("../../../assets/icons/info.svg")}
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
              SOURCE HIGHLIGHTS
            </h3>
            <h3 className="md:text-[14px] text-[12px]  font-normal md:tracking-[.7px]">
              Article sources
            </h3>
          </div>
          {/* header text lhs  */}
          <div className="flex items-start">
            <Image
              src={require("../../../assets/icons/info.svg")}
              alt="info"
              height={25}
              width={25}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey  md:px-8 px-2 md:py-5 py-3 h-[300px]">
          <div className="h-[250px] overflow-y-auto">
            {article_sources.map((article, index) => (
              <div key={index} className="mb-4">
                <p className="capitalize mb-1 text-[14px]">{article.source}</p>
                <ProgressBar
                  percentage={article.qty}
                  progressColor="bg-[#4AC7ED]"
                  classNameStyle="h-2 bg-gray-100 "
                />
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

export default SecondRow;
