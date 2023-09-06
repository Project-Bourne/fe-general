// Users.js
// import React, { useState } from "react";
import { UsersList } from "./user";
import { Header } from "./components";
import { TableBodyData } from "./utils/constants";

function Users() {

  return (
    <>
      <div>
        <Header />
        <div>
          <UsersList tableData={TableBodyData} usertype={-1} /></div>
      </div>
    </>
  );
}

export default Users;
