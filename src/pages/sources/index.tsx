// Users.js
import React from "react";
import SourceList from "./components/index";
import Header from "./components/Header";

const Users = () => {
  return (
    <>
      <div className="mt-[-0.9rem] z-30 fixed md:w-[80%] w-[86%] bg-white">
        <Header />
      </div>
      <div className="z-10">
        <SourceList />
      </div>
    </>
  );
};

export default Users;
