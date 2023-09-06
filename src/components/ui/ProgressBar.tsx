// ProgressBar.js
import React from "react";

type ProgressBarProps = {
  classNameStyle?: string;
  percentage: number;
  progressColor: string;
};

const ProgressBar = ({
  classNameStyle,
  percentage,
  progressColor,
}: ProgressBarProps) => {
  return (
    <div className={`${classNameStyle} w-full rounded-lg overflow-hidden`}>
      <div
        className={` h-full transition-all duration-300 ease-in-out ${progressColor}`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
