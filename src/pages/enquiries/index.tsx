import React, { useEffect } from "react";
import AuditLoagTab from "./tab";
import NotificationService from "@/services/notification.service";
import { setUserInfo } from "@/redux/reducer/authReducer";
import { useDispatch } from "react-redux";
import Auth from "@/services/auth.service";

const index = () => {
  const dispatch = useDispatch();
  
  // useEffect(() => {
  //   Auth.getUserViaAccessToken()
  //     .then((response) => {
  //       if (response.status) {
  //         dispatch(setUserInfo(response.data));
  //       }
  //     })
  //     .catch((err) => {
  //       NotificationService.error({
  //         message: "Error!",
  //         addedText: <p>Access forbidden. Redirecting to login page.</p>,
  //         position: "top-center",
  //       });
  //     });
  // }, []);

  return (
    <div className="py-10">
      <AuditLoagTab />
    </div>
  );
};

export default index;
