import React, { useEffect, useState } from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import data from "./data";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

const MataDataContent = () => {
  const { title, author, confidence, location, date, tags, source } = data;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="bg-white w-[63rem] h-[100%] rounded-[1rem] mt-10 mx-5">
      <div className="mx-5">
        <p className="text-gray-500">
          {isLoading ? <Skeleton width={50} /> : "Title"}
        </p>
        <h1 className="text-black text-3xl">
          {isLoading ? <Skeleton /> : title}
        </h1>
      </div>
      <div className="mx-5 flex flex-wrap gap-10">
        <div className="mt-3 w-[25rem]">
          <p className="text-gray-500 mt-3">
            {isLoading ? <Skeleton width={50} /> : "Author"}
          </p>
          <Link href="../viewcontent/viewcontent1">
            <div className="flex gap-3 items-center my-5 cursor-pointer">
              {isLoading ? (
                <Skeleton circle width={50} height={50} />
              ) : (
                <Image
                  src={require("../../../assets/icons/Avatarmeta.svg")}
                  alt="documents"
                  className="cursor-pointer"
                  width={50}
                />
              )}
              <div>
                <p className="font-bold">
                  {isLoading ? <Skeleton width={150} /> : author.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {isLoading ? <Skeleton width={150} /> : author.location}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="mt-3 w-[25rem]">
          <p className="text-gray-500 mt-3 pl-10">
            {isLoading ? <Skeleton width={150} /> : "Confidence"}
          </p>
          <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
            <div className="w-12">
              {isLoading ? (
                <Skeleton width={50} height={50} circle />
              ) : (
                <ProgressBar />
              )}
            </div>
            <div>
              <p className="font-bold">
                {isLoading ? (
                  <Skeleton width={150} />
                ) : (
                  `${confidence}% Confidence Level`
                )}
              </p>
              {isLoading ? (
                <Skeleton width={150} />
              ) : (
                <p className="text-sirp-primary2 text-xs rounded-[1rem] border text-center w-[8rem]">
                  Review confidence
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500">
            {isLoading ? <Skeleton width={50} /> : "Location"}
          </p>
          <div className="flex gap-3 items-center mt-3">
            {isLoading ? (
              <Skeleton width={50} height={50} circle />
            ) : (
              <Image
                src={require("../../../assets/icons/map.svg")}
                alt="documents"
                className="cursor-pointer"
                width={50}
              />
            )}
            <div>
              <p className="font-bold">
                {isLoading ? <Skeleton width={150} /> : location.country}
              </p>
              <p className="text-gray-500 text-sm">
                {isLoading ? <Skeleton width={150} /> : location.city}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500 pl-10">
            {isLoading ? <Skeleton width={50} /> : "Date"}
          </p>
          <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
            {isLoading ? (
              <Skeleton width={50} height={50} circle />
            ) : (
              <Image
                src={require("../../../assets/icons/date.svg")}
                alt="documents"
                className="cursor-pointer"
                width={50}
              />
            )}
            <div>
              <p className="font-bold">
                {isLoading ? <Skeleton width={150} /> : date.date}
              </p>
              <p className="text-gray-500 text-sm">
                {isLoading ? <Skeleton width={150} /> : date.time}
              </p>
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500">
            {isLoading ? <Skeleton width={50} /> : "Tags & Keywords"}
          </p>
          <div className="flex gap-3 items-center mt-3">
            <div>
              <ul className="flex flex-wrap gap-2">
                {tags.map((keyword) => (
                  <div key={keyword.id}>
                    {isLoading ? (
                      <Skeleton width={70} />
                    ) : (
                      <li className="border p-2 rounded-[0.7rem] text-[0.7rem] bg-sirp-keynotebg">
                        {keyword.key}
                      </li>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-[25rem]">
          <p className="text-gray-500 pl-10">
            {isLoading ? <Skeleton width={50} /> : "Source"}
          </p>
          <div className="flex gap-3 border-l-2 border-sirp-keynotebg pl-10 items-center my-5">
            <div>
              {isLoading ? (
                <Skeleton width={50} />
              ) : (
                <p className="border p-2 rounded-[0.7rem] text-[0.7rem] bg-sirp-keynotebg">
                  Source
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MataDataContent;
