// Users.js
import React, { useState } from "react";
import SourceList from "./components/index";
import Header from "./components/Header";

const Sources = () => {
  const [source, setSource] = useState([]);
  return (
    <>
      <div className="mt-[-0.9rem] z-10 fixed md:w-[80%] w-[86%] bg-white">
        <Header source={source} setSource={setSource} />
      </div>
      <div className="z-10">
        <SourceList source={source} />
      </div>
    </>
  );
};

export default Sources;
