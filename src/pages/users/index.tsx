// Users.js
import React, { useEffect } from "react";
import UsersList  from "./components/index";
import Header from "./components/Header";
import { setUserInfo } from "@/redux/reducer/authReducer";
import NotificationService from "@/services/notification.service";
import { useDispatch } from "react-redux";
import Auth from "@/services/auth.service";

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
      });
  }, []);
  return (
    <>
      <div>
        <div className="mt-[-0.9rem] z-20 fixed md:w-[80%] w-[86%] bg-white">
        <Header />
        </div>
        <div className="z-10">
        {/* this is the users list table  */}
          <UsersList /> 
        </div>
      </div>
    </>
  );
}

export default Users;
