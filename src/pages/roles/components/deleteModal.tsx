import React from "react";
import Image from "next/image";
import { Button, CustomModal } from "@/components/ui";

function DeleteModal({ cancelModal, handleDelete, roles }) {
  const handleDeleteItme = () => {
    const roleId = roles.uuid;
    handleDelete(roleId);
    cancelModal();
  };
  return (
    <>
      <h1 className="font-semibold text-[24px] px-2 mb-3"> Delete Role </h1>
      <div className="grid pb-5 pt-2 px-2">
        <p className="text-sm mb-3">
          Are you sure you want to delete this Role{" "}
          <span className="text-[#09495D] capitalize font-bold">
            {roles?.roleName}
          </span>{" "}
          ?
        </p>
        <div className="px-5 py-1.5 flex gap-x-3.5 rounded-md bg-[#45C6ED] mb-4 items-center justify-center">
          <div className="text-sm">
            <p className="font-semibold capitalize">{roles?.roleName}</p>
          </div>
        </div>

        <Button
          value="No, don’t Delete Role"
          onClick={cancelModal}
          classNameStyle="p-2 rounded-md text-[#09495D] text-[14px] border-[1.2px] border-[#09495D]"
          background="bg-white"
        />
        <Button
          value="Yes, Delete Role"
          onClick={handleDeleteItme}
          classNameStyle="p-2 rounded-md text-white text-[14px] border-[2px] border-[#EF4444] mt-3"
          background="bg-[#EF4444]"
        />
      </div>
    </>
  );
}

export default DeleteModal;
