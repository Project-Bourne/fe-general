import { useTruncate } from "@/components/custom-hooks";
import { logout } from "@/redux/reducer/authReducer";
import AuthService from "@/services/auth.service";
import NotificationService from "@/services/notification.service";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import notification from "../../../assets/icons/notification.svg";
import down from "../../../assets/icons/down.svg";
import dashboard from "../../../assets/icons/dashboard.svg";
import { Cookies, useCookies } from "react-cookie";
// import DashboardDropdown from "./DropdownItems";
import { Tooltip } from "@mui/material";

function RightComp() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [toggleDashboard, setToggleDashboard] = useState(false);
  const authService = new AuthService();
  const [cookies, setCookie, removeCookie] = useCookies(["deep-access"]);
  const { userInfo, userAccessToken, refreshToken } = useSelector(
    (state: any) => state?.auth
  );
  const [dropdown, setDropdown] = useState(false);

  const handleLogout = async (event: any) => {
    event.stopPropagation();
    dispatch(logout());
    localStorage.clear();

    removeCookie("deep-access", { path: "/" });
    router.push("http://192.81.213.226:30/auth/login");
    NotificationService.success({
      message: "Success!",
      addedText: <p>Logout successful</p>,
      position: "top-center",
    });
    setDropdown(false);
  };

  const userName = () => userInfo?.firstName + " " + userInfo?.lastName;
  const userInitials = () => {
    if (userInfo?.firstName && userInfo?.lastName[0])
      return userInfo?.firstName[0] + userInfo?.lastName[0];
  };

  return (
    <div className="flex flex-row items-center self-start">
      <div className={`${styles.view1} bg-white`}>
        <Image
          src={notification}
          alt="notification"
          width={20}
          height={20}
          className="self-center"
          style={{ alignSelf: "center" }}
          priority
        />
      </div>
      {/* <div className={`${styles.view1} hidden md:flex relative`}>
      <Tooltip title={toggleDashboard ? "Close modules" : "Open all modules"}>
        <Image
          src={dashboard}
          alt="dashboard"
          width={20}
          height={20}
          className="self-center"
          onClick={() => setToggleDashboard((prevState) => !prevState)}
          style={{ alignSelf: "center" }}
          priority
        />
        </Tooltip>
        {toggleDashboard && <DashboardDropdown />}
      </div> */}

      <div className="relative bg-sirp-lightGrey flex flex-row mr-2 py-2 px-2 md:px-5 h-[45px] rounded-[12px] items-center justify-center cursor-pointer">
        <div
          className="flex flex-row items-center justify-center"
          onClick={() => setDropdown((prevState) => !prevState)}
        >
          <img
            src={userInfo?.image ?? userInitials()}
            alt="userImage"
            width={25}
            height={25}
            className="rounded-full object-fill"
          />

          <Image
            src={down}
            alt="down"
            width={18}
            height={18}
            className="mx-3 object-contain hidden md:block"
            priority
          />
        </div>

        {/* line break */}
        <div className="h-[100%] w-[0.5px] bg-sirp-grey hidden md:block" />

        <div className="ml-3 bg-sirp-lightGrey w-full self-center hidden md:block" onClick={()=>router.push("http://192.81.213.226:30/settings/profile")} >
          <h2 className="text-sirp-grey text-[13px] capitalize">
            {userInfo?.firstName && useTruncate(userName(), 14)}
          </h2>
          <h2 className="text-sirp-primary text-[11px] capitalize">
            {userInfo?.role?.roleName}
          </h2>
        </div>
        <Image
          src={down}
          alt="ellipsis"
          width={18}
          height={18}
          className="mx-3 object-contain flex md:hidden"
          priority
        />
      </div>
      {dropdown && (
        <div className="absolute bg-sirp-lightGrey text-black flex flexrow text-[13px] border w-[10rem] text-center top-[5rem] rounded-lg items-center justify-around">
          <p className="cursor-pointer text-sirp-primary" onClick={()=>router.push("http://192.81.213.226:30/home")}>Go to IRP</p>

          <p onClick={handleLogout} className="cursor-pointer text-red-500">
            Log Out
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  view1:
    "bg-sirp-lightGrey cursor-pointer flex py-2 px-2 rounded-[15px] w-[45px] h-[45px] items-center justify-center content-center mr-4",
};

export default RightComp;
