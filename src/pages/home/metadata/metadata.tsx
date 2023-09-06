import React, { useState } from "react";
import AddLink from "../components/AddLink";
import MataDataContent from "../components/MataDataContent";
import AddContentHeaderTwo from "../components/AddContentHeaderTwo";
import ContentHistroy from "../components/ContentHistory";
import MainActionIcon from "../components/MainActionIcon";
import Min_and_Max_icon from "../components/Min_and_Max_icon";

function metaData() {
  const [hideMeta, setHideMeta] = useState(false);
  const handleMax = () => {
    setHideMeta(true);
  };
  const handleMin = () => {
    setHideMeta(false);
  };
  return (
    <div className="bg-sirp-contentbg border bg-sirp-secondary2  h-[100%] mx-10 rounded-[1rem]">
      <MainActionIcon />
      <AddLink />
      <div className="bg-white rounded-[1rem] my-5 mx-5">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />
        {hideMeta === false && <MataDataContent />}
      </div>
      <div className="mt-5">
        <AddContentHeaderTwo />
        <ContentHistroy />
      </div>
    </div>
  );
}

export default metaData;
