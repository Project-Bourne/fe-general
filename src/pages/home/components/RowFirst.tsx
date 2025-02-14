import Image from "next/image";
import { useState } from "react";
import DateComponent from "./DatePicker";
import BarChartComponent from "../charts/bar";
import on_bar from "../../../assets/icons/on.chart-bar.svg";
import bar from "../../../assets/icons/chart-bar.svg";
import calendar from "../../../assets/icons/calendar.svg";
import right_arrow from "../../../assets/icons/right-arrow.svg";
import info from "../../../assets/icons/info.svg";
import SourceService from "@/services/sources";
import { useDispatch, useSelector } from "react-redux";
import { setReports } from "@/redux/reducer/userSlice";
import NotificationService from "@/services/notification.service";

function FirstRow() {
  const { reports } = useSelector((state: any) => state?.user);
  const totalarticlesCrawled = reports?.report?.totalItems;

  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("bar");
  const [display, setDisplay] = useState({
    bar: true,
  });

  const articlesCrawled = totalarticlesCrawled

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const handleData = async (e) => {
    e.preventDefault();
    let formattedStartDate = "";
    let formattedEndDate = "";
    if (dateRange.startDate && dateRange.endDate) {
      // Format the dates in the desired format: YYYY/MM/DD
      formattedStartDate = `${dateRange.startDate.getFullYear()}/${(
        dateRange.startDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${dateRange.startDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
      formattedEndDate = `${dateRange.endDate.getFullYear()}/${(
        dateRange.endDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${dateRange.endDate
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    }
    // Construct the query parameters
    const queryParams = `startDate=${formattedStartDate}&endDate=${formattedEndDate}`;
    try {
      const reports = await SourceService.getReportsByDate(
        formattedStartDate,
        formattedEndDate
      );
      if (reports.status) {
        const data = reports.data;
        dispatch(setReports(data));
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p> `${reports.message}, please try again`</p>,
          position: "top-center",
        });
      }
    } catch (error: any) {
      NotificationService.error({
        message: "Error!",
        addedText: <p> `${error}, something happened. please try again`</p>,
        position: "top-center",
      });
    }
  };

  const showChart = (chartType) => {
    // show each chart depending on state change
    switch (chartType) {
      case "bar":
        setIsActive("bar");
        setDisplay({
          bar: true,
        });
        break;
      // case "line":
      //   setIsActive("line");
      //   setDisplay({
      //     bar: false,
      //     line: true,
      //     scatter: false,
      //   });
      //   break;
      // case "scatter":
      //   setIsActive("scatter");
      //   setDisplay({
      //     bar: false,
      //     line: false,
      //     scatter: true,
      //   });
      //   break;
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
              src={isActive === "bar" ? on_bar : bar}
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
          </div>
          {/* date picker  */}
          <div className="flex gap-x-4">
            <div className="flex items-center gap-x-1 border-[2px] border-gray-100 rounded-md h-0 py-4 px-3">
              <Image src={calendar} alt="" height={20} width={20} />
              <DateComponent
                placeholder={"Start date"}
                selectedDate={dateRange.startDate}
                onDateChange={(date) =>
                  setDateRange({ ...dateRange, startDate: date })
                }
              />
              <Image src={right_arrow} alt="info" height={25} width={25} />
              <DateComponent
                placeholder={"Stop date"}
                selectedDate={dateRange.endDate}
                onDateChange={(date) =>
                  setDateRange({ ...dateRange, endDate: date })
                }
              />
            </div>
            <div className="flex items-start mt-2" onClick={handleData}>
              <button
                className="bg-sirp-primary text-white rounded-md px-4"
                type="button"
              >
                Enter
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* body and graph  */}
      <div className="border-[2px] md:px-[2rem]  py-4 border-sirp-lightGrey h-[300px] overflow-x-auto">
        {isActive === "bar" && <BarChartComponent />}
      </div>
    </div>
  );
}

export default FirstRow;
