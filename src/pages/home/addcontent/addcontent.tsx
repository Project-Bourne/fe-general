import React from "react";
import AddContentHeader from "../components/AddContentHeader";
import AddLink from "../components/AddLink";
import AddContentHeaderTwo from "../components/AddContentHeaderTwo";
import ContentHistory from "../components/ContentHistory";

function addcontext() {
  return (
    <div className="h-[100%] my-4 mx-10 pt-5 bg-sirp-secondary2 pb-5 border rounded-[1rem]">
      <AddContentHeader />
      {/* breadcrum  */}

      {/* add link  */}

      <AddLink />
      <AddContentHeaderTwo />
      <ContentHistory />
    </div>
  );
}

export default addcontext;
