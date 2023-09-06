import React, { useState } from "react";
import HomeHeader from "../starred/components/HeadIcon";
import HomeHeaderTwo from "../starred/components/HeadIconTwo";
import HomeContent from "../starred/components/Content";
import Image from "next/image";
import { ListItem } from "../home/components";
import dummy from "../../utils/dummy.json";

function Exports() {
  const [activeOption, setActiveOption] = useState("All");
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const handleCheckboxes = () => {
    const allChecked = dummyData.every((item) => item.isMarked);
    const updatedData = dummyData.map((item) => {
      return {
        ...item,
        isMarked: !allChecked,
      };
    });
    setDummyData(updatedData);
  };

  const handleCheckboxChange = (id) => {
    const updatedData = dummyData.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isMarked: !item.isMarked, // Toggle the isMarked property
        };
      }
      return item;
    });
    setDummyData(updatedData);
  };

  const filteredData =
    activeOption === "All"
      ? dummyData
      : dummyData.filter((item) => item.isMarked === false);

  return (
    <div className="bg-sirp-listBg border h-[100%] my-4 mx-3 md:mx-10 pt-5 rounded-[1rem]">
      <HomeHeader
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
        onClick={handleCheckboxes}
      />
      <HomeHeaderTwo
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
      />
      {filteredData?.map((item, index) => {
        return (
          <div key={index}>
            <ListItem
              isMarked={item.isMarked}
              name={item.name}
              desc={item.description}
              message={item.message}
              handleChange={() => handleCheckboxChange(item.id)} // Pass the item id to the handleCheckboxChange function
              time={item.time}
              buttonType="view"
              viewDeleteButtons={
                <Image
                  src={require("../../assets/icons/archive-view.svg")}
                  alt="view-archives"
                  height={30}
                  width={30}
                />
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export default Exports;
