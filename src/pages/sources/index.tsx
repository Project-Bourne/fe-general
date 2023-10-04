// Users.js
// import React, { useState } from "react";
import { UsersList } from "./user";
import { Header } from "./components";
import { SourcesTableHeaderData } from "./utils/constants";

function Users() {

  return (
    <>
      <div>
        <Header />
        <div>
          <UsersList tableData={SourcesTableHeaderData} usertype={-1} /></div>
      </div>
    </>
  );
}

export default Users;
