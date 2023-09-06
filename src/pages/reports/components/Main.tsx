import { CustomModal } from "@/components/ui";
import FirstRow from "./RowFirst";
import FourthRow from "./RowFourth";
import SecondRow from "./RowSecond";
import ThirdRow from "./RowThird";
import { useState } from "react";
import ReportDetails from "./ReportDetails";

function Main() {
  const [modalToggle, setModalToggle] = useState(false);

  return (
    <div className="grid gap-y-3 md:h-[78vh] overflow-y-auto w-[78vw] md:px-5 px-2 py-4 bg-sirp-lightGrey rounded-xl">
      <FirstRow />
      <SecondRow />
      <ThirdRow />
      <FourthRow showReportDetails={() => setModalToggle(true)} />
      {modalToggle && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setModalToggle(false)}
        >
          <ReportDetails />
        </CustomModal>
      )}
    </div>
  );
}

export default Main;
