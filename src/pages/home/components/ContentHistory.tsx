import React from "react";
import Image from "next/image";

const data = [
  {
    id: 1,
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri",
    keywords: [
      {
        id: 1,
        keyone: "UI Design",
      },
      {
        id: 2,
        keyone: "Web 3 Design",
      },
      {
        id: 3,
        keyone: "Tutorial",
      },
    ],
  },
  {
    id: 2,
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri",
    keywords: [
      {
        id: 1,
        keyone: "UI Design",
      },
      {
        id: 2,
        keyone: "Web 3 Design",
      },
      {
        id: 3,
        keyone: "Tutorial",
      },
    ],
  },
  {
    id: 3,
    title:
      "Redesigned Naira: CBN launches Cash Swap Programme for rural and Corn Ewa ati garri",
    keywords: [
      {
        id: 1,
        keyone: "UI Design",
      },
      {
        id: 2,
        keyone: "Web 3 Design",
      },
      {
        id: 3,
        keyone: "Tutorial",
      },
    ],
  },
];

function ContentHistroy() {
  return (
    <div className="flex flex-wrap w-full flex-row h-100%">
      {data.map((item) => (
        <div
          key={item.id}
          className="border border-gray-500 mt-5 w-[30rem] rounded-[1rem] mx-5 bg-sirp-contentbg"
        >
          <div className="flex justify-end mr-5 pt-5">
            <Image
              src={require("../../../assets/icons/starred.svg")}
              alt="documents"
              className="cursor-pointer w-4 h-4"
              width={10}
              height={10}
            />
          </div>
          <div className="pt-10 px-5">
            <p className="text-gray-500">Title</p>
            <h2 className="text-sm">{item.title}</h2>
          </div>
          <p className="pt-4 mb-2 px-5 text-gray-500">Keywords</p>

          <ul className="flex flex-wrap px-5">
            {item.keywords.map((keyword) => (
              <li
                key={keyword.id}
                className="mr-2 border p-2 rounded-[0.7rem] text-[0.7rem] mb-5 bg-sirp-keynotebg"
              >
                {keyword.keyone}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="border flex items-center gap-2 cursor-pointer justify-center py-2 border-gray-500 mt-5 w-[31rem]  h-[100%] rounded-[1rem] mx-5 bg-sirp-contentbg">
        <h2>Show all</h2>
        <Image
          src={require("../../../assets/icons/leftArro.svg")}
          alt="documents"
          className="cursor-pointer w-[2rem] h-[2rem] mt-2"
          width={10}
        />
      </div>
    </div>
  );
}

export default ContentHistroy;
