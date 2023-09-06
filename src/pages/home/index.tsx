import React, { useState } from "react";
import HomeHeader from "../starred/components/HeadIcon";
import HomeHeaderTwo from "../starred/components/HeadIconTwo";
import HomeContent from "../starred/components/Content";
import dummy from "../../utils/dummy.json";
import Link from "next/link";

function Index() {
  const [activeOption, setActiveOption] = useState("All");
  const [dummyData, setDummyData] = useState(dummy);

  const handleOptionChange = (option) => {
    setActiveOption(option);
  };

  const handleCheck = (id) => {
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

  const filteredData =
    activeOption === "All"
      ? dummyData
      : dummyData.filter((item) => item.isMarked === false);

  return (
    <div className="bg-sirp-listBg border h-[100%] my-4 md:mx-10 mx-2 pt-5 rounded-[1rem]">
      <HomeHeader
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
        onClick={handleCheckboxes}
      />
      <HomeHeaderTwo
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
        onClick={handleCheckboxes}
      />
      <HomeContent data={filteredData} onCheck={handleCheck} />
    </div>
  );
}

export default Index;
