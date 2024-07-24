import Image from "next/image";
import ProgressBar from "@/components/ui/ProgressBar";
import MapChart from "../charts/map";
import info from "../../../assets/icons/info.svg";
import { useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import { useEffect, useState } from "react";
const countriesData = require("../../../utils/countries.json");

function SecondRow({ countries }) {
  const { topSources } = useSelector((state: any) => state?.user);
  const [countryInfo, setCountryInfo] = useState([]);
  const topArticle = topSources?.data;

  useEffect(() => {
    if (countries && countries?.length > 0) {
      let filteredCountries = [];
      for (let i = 0; i < countries.length; i++) {
        for (let j = 0; j < countriesData.length; j++) {
          if (countriesData[j].name === countries[i]) {
            filteredCountries.push(countriesData[j]);
          }
        }
      }
      setCountryInfo(filteredCountries);
    }
  }, [countries]);

  const LeftHandDisplay = () => {
    return (
      <div className="grid w-full rounded-xl bg-white">
        {/* header  */}
        <div className="flex md:justify-between gap-x-[8rem] md:gap-x-0  px-2 md:px-8 py-3  md:py-5">
          {/* header text rhs  */}
          <div>
            <h3 className="md:text-[14px] text-[12px] font-light md:tracking-[.7px]">
              LOCATION
            </h3>
            <h3 className="md:text-[14px] text-[12px]  font-normal md:tracking-[.7px]">
              Location of articles crawled
            </h3>
          </div>
          {/* header text lhs  */}
          <div className="flex items-start ">
            <Tooltip title="location for data source">
              <Image
                src={info}
                alt="info"
                height={25}
                width={25}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey h-[300px]">
          <div className="h-[270px]">
            <MapChart userCountries={countryInfo} />
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
          {/* <div className="flex items-start">
            <Image
              src={info}
              alt="info"
              height={25}
              width={25}
              className="cursor-pointer"
            />
          </div> */}
        </div>

        {/* body and graph  */}
        <div className="border-[2px] border-sirp-lightGrey md:px-8 px-2 md:py-5 py-3 h-[300px]">
          <div className="h-[250px] overflow-y-auto cursor-pointer">
            {topArticle?.map((article, index) => (
              <div key={index} className="mb-4 group relative">
                <p className="mb-1 text-[14px]">{article.domain}</p>
                <div className="relative">
                  <ProgressBar
                    percentage={article.percentage}
                    progressColor="bg-[#4AC7ED]"
                    classNameStyle="h-2 bg-gray-100 "
                  />
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {article.percentage}% {/* Display percentage */}
                  </div>
                </div>
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
