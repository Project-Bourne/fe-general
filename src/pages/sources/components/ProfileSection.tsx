import { Dropdown, DropdownWithFlag } from "@/components/ui";
import Image from "next/image";
import React, { useState } from "react";
import { UserRoles } from "@/utils/constants";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setSingleUser } from "@/redux/reducer/userSlice";

export default function ProfileSection({ isEditing }) {
  const { user } = useSelector((state: any) => state?.user)
  const router = useRouter();
  const dispatch = useDispatch()
  const [country, setCountry] = useState(user?.country);
  const [role, setRole] = useState(user?.role);

  return (
    <div className="pb-4 w-full mt-1 border-b-[1.5px]">
      <div className="flex flex-col w-full">
        <h2 className="font-semibold text-[13px] px-8">Profile Picture</h2>
        <div className="flex flex-row w-full items-center my-4 border-b px-8 pb-3">
          <div className="w-[80px]">
            <p className="text-[12px] text-sirp-grey">AVI:</p>
          </div>

          <div className="flex flex-col ml-[3vh] items-center bo">
            {/* Profile Image */}
            <div className="flex flex-row items-center">
              <img
                src={user?.image}
                alt="user"
                width={20}
                height={20}
                className="cursor-pointer mx-5"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Roles */}
      <div className="grid md:flex md:flex-row items-center my-[20px] w-full px-8">
        <div className="w-[80px]">
          <label htmlFor="email" className="text-[12px] text-sirp-grey">
            Role:{" "}
          </label>
        </div>
        <div className="md:w-[38%] w-full">
          <Dropdown
            data={UserRoles}
            onChange={(e) => dispatch(setSingleUser(
              {
                ...user,
                role: e.target.value

              }
            ))}
            className="text-[12px] text-black border-[1.5px] rounded-md py-2 px-2 md:mx-4 "
            style={{ fontSize: 12 }}
          />
        </div>
      </div>

      {/* Countries */}
      <div className="grid md:flex md:flex-row items-center my-[20px] w-full px-8">
        <div className="w-[80px]">
          <label htmlFor="country" className="text-[12px] text-sirp-grey">
            Country:{" "}
          </label>
        </div>

        <div className="w-[100%] md:w-[38%]">
          <DropdownWithFlag
            onChange={(e) => dispatch(setSingleUser(
              {
                ...user,
                country: country
              }
            ))}
            selectItem={country}
            style={"w-full md:mx-4 text-[12px]"}
            isDisabled={true}
          />
        </div>
      </div>
    </div>
  );
}
