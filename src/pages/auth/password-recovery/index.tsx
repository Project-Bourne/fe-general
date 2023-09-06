import React, { useEffect, useState } from "react";
import Link from "next/link";
import {} from "@mui/material";

import { AuthLayout } from "@/layout/index";
import { Input, Button } from "@/components/ui";
import Image from "next/image";

function PasswordRecovery() {
  const [password, setPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState(0);
  const [isSpecial, setIsSpecial] = useState(false);
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isMinimum, setIsMinimum] = useState(false);

  useEffect(() => {
    if (isSpecial && isUpperCase && isMinimum) {
      setPasswordStatus(1);
    } else {
      setPasswordStatus(0);
    }
  }, [isSpecial, isUpperCase, isMinimum]);

  const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/; // regex to test for special characters
  const UPPERCASE_REGEX = /[A-Z]/; // regex to test for uppercase

  // check for special character
  const checkSpecial = (arg) => {
    if (SPECIAL_CHAR_REGEX.test(arg)) {
      setIsSpecial(true);
    } else {
      setIsSpecial(false);
    }
  };
  // check for uppercase
  const checkUpperCase = (arg) => {
    if (UPPERCASE_REGEX.test(arg)) {
      setIsUpperCase(true);
    } else {
      setIsUpperCase(false);
    }
  };
  // check for minimum of 8 characters
  const checkMinimum = (arg) => {
    if (arg.length >= 8) {
      setIsMinimum(true);
    } else {
      setIsMinimum(false);
    }
  };

  const handleChange = async (e: any) => {
    const password_data = e.target.value;
    checkSpecial(password_data);
    checkUpperCase(password_data);
    checkMinimum(password_data);
    setPassword(password_data);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (passwordStatus === 1) {
      console.log(password);
    } else {
      console.log("oops sorry, incorrect data");
    }
  };

  return (
    <AuthLayout
      headerText={"Create Password"}
      subText={"Create a password to access your account"}
      isTextCenter={true}
    >
      <form
        className="mt-[3.5rem]  max-w-[370px] mx-auto pb-7"
        onSubmit={handleSubmit}
      >
        {/* password  */}
        <div className="grid gap-1 mb-3">
          <label>Password</label>
          <Input
            placeholder="*********"
            type="password"
            onChange={(e) => handleChange(e)}
          />
        </div>

        {/* error container  */}
        <div className="rounded-lg md:text-[14px] text-[12px] px-3 py-4 my-7 bg-gray-50">
          <p className="mb-2">
            <span className="text-gray-500 ">Password Strength:</span>{" "}
            <span
              className={`${
                passwordStatus === 0
                  ? "text-sirp-dashbordb3a"
                  : "text-sirp-success"
              } font-[500]`}
            >
              {passwordStatus === 0 ? "Weak" : "Strong"}
            </span>
          </p>
          <ul className="grid">
            <li
              className={`${
                isSpecial ? "text-sirp-success" : "text-gray-500"
              } flex gap-x-2 items-center`}
            >
              <Image
                src={
                  isSpecial
                    ? require("../../../assets/icons/custom-list-on.svg")
                    : require("../../../assets/icons/custom-list.svg")
                }
                alt="list"
                width={15}
                height={15}
              />
              At least one special character or number
            </li>
            <li
              className={`${
                isUpperCase ? "text-sirp-success" : "text-gray-500"
              } flex gap-x-2 items-center`}
            >
              <Image
                src={
                  isUpperCase
                    ? require("../../../assets/icons/custom-list-on.svg")
                    : require("../../../assets/icons/custom-list.svg")
                }
                alt="list"
                width={15}
                height={15}
              />
              Atleast one Uppercase
            </li>
            <li
              className={`${
                isMinimum ? "text-sirp-success" : "text-gray-500"
              } flex gap-x-2 items-center`}
            >
              <Image
                src={
                  isMinimum
                    ? require("../../../assets/icons/custom-list-on.svg")
                    : require("../../../assets/icons/custom-list.svg")
                }
                alt="list"
                width={15}
                height={15}
              />
              Minimum of 8 characters
            </li>
          </ul>
        </div>

        {/* forgot password  */}
        <div className="w-full mb-[10px]">
          <div className="flex gap-1">
            <input type="checkbox" id="rememberMe" />
            <label className="font-light text-[13px]" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
        </div>

        {/* submit button  */}
        <Button
          value="Complete account creation"
          type="submit"
          classNameStyle="text-white p-3"
          background="bg-sirp-primary"
          size="xl"
        />
      </form>
    </AuthLayout>
  );
}

export default PasswordRecovery;
