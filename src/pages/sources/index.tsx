// Users.js
import React, { useEffect, useState } from "react";
import SourceList from "./components/index";
import Header from "./components/Header";
import { setUserInfo } from "@/redux/reducer/authReducer";
import NotificationService from "@/services/notification.service";
import { useDispatch } from "react-redux";
import Auth from "@/services/auth.service";
import { logout } from "@/hooks/api";

const Sources = () => {
  const dispatch = useDispatch();
  const [source, setSource] = useState([]);

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
      logout();
  }, []);
  return (
    <>
      <div className="mt-[-0.9rem] z-20 fixed md:w-[80%] w-[86%] bg-white">
        <Header source={source} setSource={setSource} />
      </div>
      <div className="z-10">
        <SourceList source={source} />
      </div>
    </>
  );
};

export default Sources;
