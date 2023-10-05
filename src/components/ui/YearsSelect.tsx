import React from "react";

function YearsSelect({ backDateTo, handleYearsChange, width }) {
  const getLast10Years = () => {
    const currentYear = new Date().getFullYear();
    const lastXYears = [];

    for (let i = currentYear; i >= currentYear - backDateTo; i--) {
      lastXYears.push(i);
    }

    return lastXYears;
  };

  const _lastXYears = getLast10Years();

  const handleChange = (_arg: any) => handleYearsChange(_arg);

  return (
    <select
      className={` ${width} px-2 py-3 border-[1px] border-gray-100 rounded font-light`}
      onChange={(e: any) => handleChange(e.target.value)}
    >
      {_lastXYears.map((year, index) => (
        <option key={index} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
}

export default YearsSelect;
