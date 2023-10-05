import { tableBodyData } from "@/utils/reports.constants";
import ReportsTable from "./ReportsTable";

function FourthRow({ showReportDetails }) {
  const handleShowDetails = () => {
    showReportDetails();
  };
  return (
    <div className="grid w-full md:overflow-x-none pt-4  rounded-xl bg-white">
      <h2 className="font-semibold text-[20px] md:text-[24px] px-3 mb-2">
        Recent Reports
      </h2>
      <ReportsTable
        showReportDetails={handleShowDetails}
        tableBodyData={tableBodyData}
      />
    </div>
  );
}

export default FourthRow;
