import { useDuration } from "@/components/custom-hooks";
import { Button } from "@/components/ui";
import { useState } from "react";

function DigestModal() {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState<any>({
    start_date: null,
    end_date: null,
  });
  const [sector, setSector] = useState(null);

  const handleDurationChange = (_arg) => {
    const res = useDuration(_arg);
    setDuration({
      end_date: res?.currentDate,
      start_date: res?.duration,
    });
  };

  const handleSectorChange = (_arg) => {
    setSector(_arg);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="mb-3 font-bold text-[20px] text-center">Digest</h2>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Timeframe</label>
        <select
          className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
          onChange={(e: any) => handleDurationChange(e.target.value)}
        >
          <option selected>-- Select a duration --</option>
          <option value={24}>Past 24 hours</option>
          <option value={48}>Past 48 hours</option>
          <option value={72}>Past 72 hours</option>
        </select>
      </div>
      <div className="grid gap-y-2 mb-4 text-[14px]">
        <label>Sector</label>
        <select
          className="w-full px-2 py-3 border-[1px] border-gray-100 rounded font-light"
          onChange={(e: any) => handleSectorChange(e.target.value)}
        >
          <option selected>-- Select a sector --</option>
          <option value="agriculture">Agriculture</option>
          <option value="economics">Economics</option>
          <option value="medicine">Medicine</option>
        </select>
      </div>
      <Button
        value={"Generate"}
        size="xl"
        type="submit"
        background={` ${
          !duration.start_date || !sector ? "bg-gray-100" : "bg-sirp-primary"
        }`}
        classNameStyle={`py-3 text-white text-[14px] mt-7 ${
          !duration.start_date || (!sector && "pointer-events-none")
        }`}
        loading={loading}
      />
    </form>
  );
}

export default DigestModal;
