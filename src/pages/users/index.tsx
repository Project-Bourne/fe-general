// Users.js
import React from "react";
import UsersList  from "./components/index";
import Header from "./components/Header";

function Users() {
  return (
    <>
      <div>
        <Header />
        <div>
        {/* this is the users list table  */}
          <UsersList /> 
        </div>
      </div>
    </>
  );
}

export default Users;
