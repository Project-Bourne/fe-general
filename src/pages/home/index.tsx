import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Auth from "../../services/auth.service"
import NotificationService from '@/services/notification.service';
import { setUserInfo } from '@/redux/reducer/authReducer';
import SourceService from "@/services/sources";
import { CustomModal } from "@/components/ui";
import Loader from "@/components/ui/Loader";
import { setReports, setTopSources } from "@/redux/reducer/userSlice";

function Reports() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    try {
      Auth
        .getUserViaAccessToken()
        .then((response) => {
          setLoading(false);
          if (response?.status) {
            dispatch(setUserInfo(response?.data));
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Error!",
            addedText: <p>{`${err?.message}, please try again`}</p>,
            position: "top-center",
          });
        });
    } catch (err) {
    }
    fetchData();
    topSources();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const response = await SourceService?.getAllReport();
      if (response.status) {
        const data = response.data;
        dispatch(setReports(data))
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>something happened. please try again</p>,
          position: "top-center",
        });
      }
    } catch (error: any) {
      NotificationService.error({
        message: "Error!",
        addedText: <p> `${error}, something happened. please try again`</p>,
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is complete (whether it succeeds or fails)
    }
  };

  const topSources = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const response = await SourceService.getTopSources();
      if (response.status) {
        const data = response;
        dispatch(setTopSources(data))
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>something happened. please try again</p>,
          position: "top-center",
        });
      }
    } catch (error: any) {
      NotificationService.error({
        message: "Error!",
        addedText: <p> `${error}, something happened. please try again`</p>,
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is complete (whether it succeeds or fails)
    }
  };

  return (
    <div className="md:px-5 px-2 pb-5 h-[100%] relative mt-[7.5rem]">
       {isLoading && (
        <CustomModal
          style="md:w-[50%] w-[90%] h-[100%] md:h-[100vh] relative top-[5%] rounded-xl mx-auto pt-[4rem] px-3 pb-5"
          closeModal={() => {
            setIsLoading(false);
          }}
        >
          <div className="flex flex-row justify-center items-center">
            <Loader />
          </div>
        </CustomModal>
      )}
      <Header />
      <Main />
    </div>
  );
}

export default Reports;
