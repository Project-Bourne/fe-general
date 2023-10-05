import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import Auth from "../../services/auth.service"
import NotificationService from '@/services/notification.service';
import { setUserInfo } from '@/redux/reducer/authReducer';

function Reports() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

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
  }, []);
  return (
    <div className="md:px-5 px-2 pb-5 h-[87.8vh] relative -mt-[7.5rem]">
      <Header />
      <Main />
    </div>
  );
}

export default Reports;
