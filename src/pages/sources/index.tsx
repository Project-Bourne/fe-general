// Users.js
// import React, { useState } from "react";
import SourceList  from "./components/index";
import Header  from "./components/Header";
import { SourcesTableHeaderData } from "../../utils/SourceConstants";

function Users() {

  return (
    <>
      <div>
        <Header />
        <div>
          <SourceList /></div>
      </div>
    </>
  );
}

export default Users;
