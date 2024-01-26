// Users.js
import React, { useEffect } from "react";
import SourceList from "./components/index";
import Header from "./components/Header";
import NotificationService from "@/services/notification.service";
import { setUserInfo } from "@/redux/reducer/authReducer";
import Auth from "@/services/auth.service";
import { useDispatch } from "react-redux";

const Users = () => {
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
      });
  }, []);
  
  return (
    <div>
      <div className="mt-[-0.9rem] z-20 fixed md:w-[80%] w-[85%] bg-white">
        <Header />
      </div>
      <div className="z-10">
        <SourceList />
      </div>
    </div>
  );
};

export default Users;
