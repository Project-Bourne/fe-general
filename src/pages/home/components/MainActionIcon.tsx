import React from "react";
import AddContentHeader from "./AddContentHeader";
import ActionIcons from "./ActionIcons";

function MainActionIcon() {
  return (
    <div className="flex justify-between items-center">
      <AddContentHeader />
      <ActionIcons />
    </div>
  );
}

export default MainActionIcon;
