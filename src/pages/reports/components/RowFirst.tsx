import Image from "next/image";
import { useState } from "react";
import DateComponent from "./DatePicker";
import {
  ScatterChartComponent,
  BarChartComponent,
  LineChartComponent,
} from "../charts";

const articlesCrawled = 1000;

function FirstRow() {
  const [isActive, setIsActive] = useState("bar");
  const [display, setDisplay] = useState({
    bar: true,
    line: false,
    scatter: false,
  });

  const showChart = (chartType) => {
    // show each chart depending on state change
    switch (chartType) {
      case "bar":
        setIsActive("bar");
        setDisplay({
          bar: true,
          line: false,
          scatter: false,
        });
        break;
      case "line":
        setIsActive("line");
        setDisplay({
          bar: false,
          line: true,
          scatter: false,
        });
        break;
      case "scatter":
        setIsActive("scatter");
        setDisplay({
          bar: false,
          line: false,
          scatter: true,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="grid w-full md:overflow-x-none rounded-xl bg-white">
      {/* header  */}
      <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-4 py-3 ">
        {/* header text rhs  */}
        <div>
          <h3 className="text-[14px] hidden md:block font-light md:tracking-[.7px]">
            ARTICLES
          </h3>
          <h3 className="md:text-[24px] text-[14px] font-bold md:tracking-[.7px]">
            {articlesCrawled}
          </h3>
          <h3 className="text-[14px]  font-normal md:tracking-[.7px]">
            Articles crawled
          </h3>
        </div>

        <div className="hidden md:flex gap-x-[8rem] md:gap-x-[12rem]">
          {/* clickable icons  */}
          <div className="flex gap-x-3 items-start">
            <Image
              src={
                isActive === "bar"
                  ? require("../../../assets/icons/on.chart-bar.svg")
                  : require("../../../assets/icons/chart-bar.svg")
              }
              alt="bar chart"
              height={32}
              width={32}
              className={`p-1.5 border-[2px] ${
                isActive === "bar"
                  ? `bg-blue-100 border-sirp-primary`
                  : `bg-gray-50 border-gray-200`
              } rounded-lg cursor-pointer`}
              onClick={() => showChart("bar")}
            />
            <Image
              src={
                isActive === "scatter"
                  ? require("../../../assets/icons/on.chart-scatter.svg")
                  : require("../../../assets/icons/chart-scatter.svg")
              }
              alt="scatter chart"
              height={32}
              width={32}
              className={`p-1.5 border-[2px] ${
                isActive === "scatter"
                  ? `bg-blue-100 border-sirp-primary`
                  : `bg-gray-50 border-gray-200`
              } rounded-lg cursor-pointer`}
              onClick={() => showChart("scatter")}
            />
            <Image
              src={
                isActive === "line"
                  ? require("../../../assets/icons/on.chart-line.svg")
                  : require("../../../assets/icons/chart-line.svg")
              }
              alt="line chart"
              height={32}
              width={32}
              className={`p-1.5 border-[2px] ${
                isActive === "line"
                  ? `bg-blue-100 border-sirp-primary`
                  : `bg-gray-50 border-gray-200`
              } rounded-lg cursor-pointer`}
              onClick={() => showChart("line")}
            />
          </div>
          {/* date picker  */}
          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-1 border-[2px] border-gray-100 rounded-md h-0 py-4 px-3">
              <Image
                src={require("../../../assets/icons/calendar.svg")}
                alt=""
                height={20}
                width={20}
              />
              <DateComponent placeholder={"start date"} />
              <Image
                src={require("../../../assets/icons/right-arrow.svg")}
                alt=""
                width={20}
              />{" "}
              &nbsp;
              <DateComponent placeholder={"stop date"} />
            </div>
            <div className="flex items-start mt-2">
              <Image
                src={require("../../../assets/icons/info.svg")}
                alt="info"
                height={20}
                width={20}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* body and graph  */}
      <div className="border-[2px] md:px-[2rem]  py-4 border-sirp-lightGrey h-[300px] overflow-x-auto">
        {isActive === "bar" && <BarChartComponent />}
        {isActive === "scatter" && <ScatterChartComponent />}
        {isActive === "line" && <LineChartComponent />}
      </div>
    </div>
  );
}

export default FirstRow;
