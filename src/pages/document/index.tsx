import React, { useEffect } from "react";
import SourceList from "./components/index";
import Header from "./components/Header";
import Auth from "@/services/auth.service";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/redux/reducer/authReducer";
import NotificationService from "@/services/notification.service";
import { logout } from "@/hooks/api";

function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.getUserViaAccessToken()
      .then((response) => {
        if (response.status) {
          dispatch(setUserInfo(response.data));
        }
      })
      .catch((err) => {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Access forbidden. Redirecting to login page.</p>,
          position: "top-center",
        });
        logout();
      });
  }, []);
  return (
    <>
      <div>
        <div className="mt-[-0.9rem] z-10 fixed md:w-[80%] bg-white">
          <Header />
        </div>
        <div className="z-10">
          <SourceList />
        </div>
      </div>
    </>
  );
}

export default Users;
