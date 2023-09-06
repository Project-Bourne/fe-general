// DatePicker.js
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateComponent = ({ placeholder }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      dateFormat="MMMM, yyyy"
      className={"w-[100px] py-0 md:px-2 text-gray-700 font-light text-[14px]"}
      placeholderText={placeholder}
    />
  );
};

export default DateComponent;
