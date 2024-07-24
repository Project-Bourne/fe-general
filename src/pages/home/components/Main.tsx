import { CustomModal } from "@/components/ui";
import FirstRow from "./RowFirst";
import FourthRow from "./RowFourth";
import SecondRow from "./RowSecond";
import ThirdRow from "./RowThird";
import { useEffect, useState } from "react";
import ReportDetails from "./ReportDetails";
import { setReports } from "@/redux/reducer/userSlice";
import NotificationService from "@/services/notification.service";
import { useDispatch } from "react-redux";
import ReportService from "@/services/reports.service";

function Main() {
  const [modalToggle, setModalToggle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const reportsService = new ReportService();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setIsLoading(true);
    try {
      // Set isLoading to true before making the request
      const response = await reportsService.getAllReports();
      setIsLoading(false);
      if (response?.status) {
        const data = response?.data;
        dispatch(setReports(data));
        setCountries(data?.countries);
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: response?.message,
          position: "top-center",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      NotificationService.error({
        message: "Error!",
        addedText: <p>{error}, please try again</p>,
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is complete (whether it succeeds or fails)
    }
  };

  return (
    <div className="grid gap-y-3 md:h-[78vh] overflow-y-auto w-[78vw] md:px-5 px-2 pt-4 pb-7 bg-sirp-lightGrey rounded-xl">
      <FirstRow />
      <SecondRow countries={countries} />
      {/* <ThirdRow /> */}
      {/* <FourthRow showReportDetails={() => setModalToggle(true)} /> */}
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
