// Users.js
// import React, { useState } from "react";
import { SourceList } from "./source";
import { Header } from "./components";
import { SourcesTableHeaderData } from "./utils/constants";

function Users() {

  return (
    <>
      <div>
        <Header />
        <div>
          <SourceList tableData={SourcesTableHeaderData} usertype={-1} /></div>
      </div>
    </>
  );
}

export default Users;
