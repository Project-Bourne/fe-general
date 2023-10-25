// Users.js
import React from "react";
import UsersList  from "./components/index";
import Header from "./components/Header";

function Users() {
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
