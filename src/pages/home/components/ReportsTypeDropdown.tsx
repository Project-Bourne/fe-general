import { CustomModal } from "@/components/ui";
import React, { useState } from "react";

function ReportsTypeDropdown({ closeModal, setSecBrief, setDigest }) {
  const handleDigestModal = () => {
    setDigest();
    closeModal();
  };

  const handleSecurityBriefModal = () => {
    setSecBrief();
    closeModal();
  };

  return (
    <>
      <ul className="bg-white z-30 absolute right-0 top-[4rem] rounded text-[14px] shadow py-1">
        <li
          className="hover:bg-gray-100 hover:cursor-pointer text-left px-5 py-1 border-b-[1px] border-b-gray-50"
          onClick={handleSecurityBriefModal}
        >
          Security Brief
        </li>
        <li
          className="hover:bg-gray-100 hover:cursor-pointer text-left px-5 py-1"
          onClick={handleDigestModal}
        >
          Digest
        </li>
      </ul>
    </>
  );
}

export default ReportsTypeDropdown;
