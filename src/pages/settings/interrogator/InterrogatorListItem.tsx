import { LogData } from "@/utils/constants";
import React from "react";
import InterrogatorContent from "./InterrogatorContent";

const InterrogatorListItem = () => {
  return (
    <div>
      <div className="w-full h-[100%] overflow-y-scroll grid grid-cols-2">
        {LogData.map((item, index) => (
          <InterrogatorContent
            key={index}
            time={item.time}
            actionText={item.action}
            activityText={
              "Redesigned Naira: CBN launches Cash Swap Programme for rural "
            }
            docId={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default InterrogatorListItem;
