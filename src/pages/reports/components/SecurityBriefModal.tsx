// import { useDuration } from "@/components/custom-hooks";
import { Button } from "@/components/ui";
import YearsSelect from "@/components/ui/YearsSelect";
import { useState } from "react";

function SecurityBriefModal() {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<any>(null);
  const [sector, setSector] = useState(null);
  const [year, setYear] = useState("2023");

  const handleDurationChange = (_arg) => {
    setDuration(_arg);
  };

  const handleYearsChange = (_arg) => {
    setYear(_arg);
  };

  //   const handleSectorChange = (_arg) => {
  //     setSector(_arg);
  //   };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3 font-bold text-[20px] text-center">Security Brief</h2>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Timeframe</label>
        <div className="flex gap-x-3">
          <select
            className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
            onChange={(e: any) => handleDurationChange(e.target.value)}
          >
            <option selected>-- Select a duration --</option>
            <option value="q1">Q1</option>
            <option value="q2">Q2</option>
            <option value="q3">Q3</option>
            <option value="q4">Q4</option>
          </select>
          <YearsSelect
            backDateTo={1}
            handleYearsChange={handleYearsChange}
            width="w-[30%]"
          />
        </div>
      </div>
      {/* <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Sector</label>
        <select
          className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
          onChange={(e: any) => handleSectorChange(e.target.value)}
        >
          <option selected>-- Select a sector ---</option>
          <option value="agriculture">Agriculture</option>
          <option value="economics">Economics</option>
          <option value="medicine">Medicine</option>
        </select>
      </div> */}
      <Button
        value={"Generate"}
        size="xl"
        type="submit"
        background={` ${!duration ? "bg-gray-100" : "bg-sirp-primary"}`}
        classNameStyle={`py-3 text-white text-[14px] mt-7 ${
          !duration && "pointer-events-none"
        }`}
        // loading={loading}
      />
    </form>
  );
}

export default SecurityBriefModal;
