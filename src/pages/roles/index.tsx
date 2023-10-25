// Users.js
import React, { useEffect } from "react";
import SourceList from "./components/index";
import Header from "./components/Header";
import NotificationService from "@/services/notification.service";
import { setUserInfo } from "@/redux/reducer/authReducer";

const Users = () => {

  // useEffect(() => {
  //   setLoading(true);
  //   Auth.getUserViaAccessToken()
  //     .then(response => {
  //       setLoading(false);
  //       if (response.status) {
  //         dispatch(setUserInfo(response.data));
  //       } else {
  //         // Notify the user that their access token is invalid and they need to log in
  //         NotificationService.error({
  //           message: 'Access Denied',
  //           addedText: <p>Your access token is invalid or has expired. Please log in again.</p>,
  //           position: 'top-center'
  //         });
  
  //         // Redirect the user to the login page
  //         router.push('http://192.81.213.226:30/auth/login');
  //       }
  //     })
  //     .catch(err => {
  //       setLoading(false);
  //       NotificationService.error({
  //         message: 'Error!',
  //         addedText: <p>Something happened. Please try again.</p>,
  //         position: 'top-center'
  //       });
  //     });
  // }, []);
  
  return (
    <div>
      <div className="mt-[-0.9rem] z-10 fixed md:w-[80%] w-[85%] bg-white">
        <Header />
      </div>
      <div className="z-10">
        <SourceList />
      </div>
    </div>
  );
};

export default Users;
