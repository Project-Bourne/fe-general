import React, { useState } from "react";
import AddContentHeader from "../components/AddContentHeader";
import ActionIcons from "../components/ActionIcons";
import Image from "next/image";
import Link from "next/link";
import data from "../components/data";
import MataDataContent from "../components/MataDataContent";
import DummyText from "../components/dummyText";
import Min_and_Max_icon from "../components/Min_and_Max_icon";

const ViewContent = () => {
  const { author } = data;

  const [hideMeta, setHideMeta] = useState(false);
  const handleMax = () => {
    setHideMeta(true);
  };
  const handleMin = () => {
    setHideMeta(false);
  };

  return (
    <div className="bg-sirp-secondary2 h-[100%] mx-10 rounded-[1rem]">
      <div className="flex justify-between items-center">
        <div className="py-5 mx-5 flex gap-5">
          <Link href="../metadata/metadata">
            <Image
              src={require("../../../assets/icons/arrow-narrow-left 1.svg")}
              alt="documents"
              className="cursor-pointer pb-5"
              width={20}
            />
          </Link>

          <h1 className="text-black text-sm">4 of 49</h1>
          <Image
            src={require("../../../assets/icons/Icons-left.svg")}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
          <Image
            src={require("../../../assets/icons/chevron-right 1.svg")}
            alt="documents"
            className="cursor-pointer pb-5"
            width={20}
          />
        </div>
      </div>
      <h1 className="text-black text-xl">{author.name}</h1>
      <div className="bg-white rounded-[1rem] my-5 mx-5">
        <Min_and_Max_icon maxOnClick={handleMax} minOnClick={handleMin} />

        {hideMeta === false && <MataDataContent />}
      </div>

      <div className="mt-10 mx-10 pb-5">
        <DummyText />
      </div>
    </div>
  );
};

export default ViewContent;
