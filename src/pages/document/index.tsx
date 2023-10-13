import React from "react";
import SourceList from "./components/index";
import Header from "./components/Header";

function Users() {
  return (
    <>
      <div>
        <div className="mt-[-0.9rem] z-30 fixed md:w-[80%] bg-white">
          <Header />
        </div>
        <div className="z-10">
          <SourceList />
        </div>
      </div>
    </>
  );
}

export default Users;
