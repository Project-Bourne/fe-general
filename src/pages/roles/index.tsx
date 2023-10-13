// Users.js
import React from "react";
import SourceList from "./components/index";
import Header from "./components/Header";

const Users = () => {
  return (
    <div>
      <div className="fixed md:w-[80%] z-20 bg-white pt-[8rem] mt-[-10rem]">
        <Header />
      </div>
      <div className="">
        <SourceList />
      </div>
    </div>
  );
};

export default Users;