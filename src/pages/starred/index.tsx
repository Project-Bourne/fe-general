import React, { useState } from "react";
import HeadIcon from "./components/HeadIcon";
import HeadIconTwo from "./components/HeadIconTwo";
import Content from "./components/Content";
import dummy from "../../utils/dummy.json";

function Starred() {
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
    <div className="bg-sirp-listBg h-[100%] border pt-5 mx-3 md:mx-10 rounded-[1rem]">
      <HeadIcon
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
        onClick={handleCheckboxes}
      />
      <HeadIconTwo
        activeOption={activeOption}
        onOptionChange={handleOptionChange}
        onClick={handleCheckboxes}
      />
      <Content data={filteredData} onCheck={handleCheck} />
    </div>
  );
}

export default Starred;
