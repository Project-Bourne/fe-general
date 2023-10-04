import React from 'react'
import Image from "next/image";
import { Button, CustomModal } from "@/components/ui";

function DeleteModal({cancelblock, handleDelete, user}) {
  return (
    <>
    <h1 className="font-semibold text-[24px] px-2 mb-3"> Delete user </h1>
    <div className="grid pb-5 pt-2 px-2">
      <p className="text-sm mb-3">
        Are you sure you want to delete the user{" "}
        <span className="text-[#09495D]">{user?.firstName} {user?.lastName}</span> ?
      </p>
      <div className="px-5 py-1.5 flex gap-x-3.5 rounded-md bg-[#45C6ED] mb-4">
        <img
          src={user?.image}
          alt="user"
          className="rounded-full"
          width={35}
        />
        <div className="grid text-sm">
          <p className="font-semibold">{user?.firstName} {user?.lastName}</p>
          <p className="text-[12.5px] text-[#545C62]">
          {user?.email}
          </p>
        </div>
      </div>
      <Button
        value="No, don’t Delete user"
        onClick={cancelblock}
        classNameStyle="p-2 rounded-md text-[#09495D] text-[14px] border-[1.2px] border-[#09495D]"
        background="bg-white"
      />
      <Button
        value="Yes, Delete user"
        onClick={handleDelete}
        classNameStyle="p-2 rounded-md text-white text-[14px] border-[2px] border-[#EF4444] mt-3"
        background="bg-[#EF4444]"
      />
    </div>
  </>
  )
}

export default DeleteModal