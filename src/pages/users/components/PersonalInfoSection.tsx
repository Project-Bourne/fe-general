import { Button, Input } from "@/components/ui";
import Image from "next/image";
import { PersonalInformationModel } from "../models/users.module";
import UserService from "@/services/users";
import NotificationService from "@/services/notification.service";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSingleUser } from "@/redux/reducer/userSlice";
export default function PersonalInfoSection({
  handleDeleteUser,
  blockUser,
  isEditing,
  setIsEditing
}) {
  const dispatch = useDispatch()
  const { user } = useSelector((state: any) => state?.user)
  const [isActive, setIsActive] = useState('')
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password:'' });

  const updateUser = async () => {
    dispatch(setSingleUser(
      {
        ...user,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      }
    ))
    const response = await UserService.updateUser(user.uuid, user)
    if (response.status) {
      console.log(response)
      dispatch(setSingleUser(response.data))
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
    } else {
      NotificationService.error({
        message: "error!",
        addedText: <p>{response.message}. something went wrong, please try again</p>,
      });
    }
  };

  return (
    <div className="pt-4 w-full mt-3">
      <div className="flex flex-wrap justify-between w-full items-center">
        <h2 className="font-semibold text-[13px] px-8">Personal Information</h2>
        <div className="flex gap-x-5 md:mr-3">
          <Button
            value="Block User"
            background="white"
            classNameStyle="p-2 text-[12px] text-sirp-primary shadow-sm shadow-sirp-primary/[0.3] border-[1px] border-sirp-primary"
            size="lg"
            onClick={blockUser}
          />
          <Button
            background="white"
            onClick={handleDeleteUser}
            classNameStyle="py-2.5 px-3 text-[12px] text-gray-600 shadow-sm shadow-red/[0.3] border-[1px] border-sirp-primary"
            value={
              <Image
                src={require("../../../assets/icons/delete.svg")}
                alt="delete"
                height={25}
                width={25}
              />
            }
            size="sm"
          />
          <Button
            onClick={updateUser}
            background="white"
            classNameStyle="py-2.5 px-3 text-[12px] text-gray-600 shadow-sm shadow-sirp-primary/[0.3] border-[1px] border-sirp-primary"
            value={
              <Image
                src={require("../../../assets/icons/edit.svg")}
                alt="delete"
                height={25}
                width={25}
              />
            }
            size="sm"
          />
        </div>
      </div>
      <div className="grid w-full items-center my-4 border-b px-8 pb-7">
        <div className="flex md:flex-row flex-col mb-5 gap-x-[3.7rem]">
          <label htmlFor="firstname" className="text-[12px] text-sirp-grey">
            Name:
          </label>
          <div className="flex gap-x-7 md:w-[37.2%] w-full">
            <input
              onFocus={() => setIsActive('firstname')}
              value={isActive !== "firstname" ? user?.firstName : formData.firstName }
              id="firstname"
              type="text"
              autoComplete="true"
              className="text-[13px] px-3 border p-2 rounded-md"
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              onFocus={() => setIsActive('lastname')}
              id="lastname"
              value={isActive !== "lastname" ? user?.lastName : formData.lastName}
              type="text"
              className="text-[13px] px-3 border p-2 rounded-md"
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
        </div>
        <div className="md:flex md:flex-row gap-x-[2.5rem] md:w-[46%] w-full mb-5">
          <label htmlFor="email" className="text-[12px] text-sirp-grey">
            Password:
          </label>
          <input
            id="password"
            value={isActive !== "password" ? user?.password : formData.password}
            onFocus={() => setIsActive('password')}
            type="password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="text-[13px] px-3 border p-2 rounded-md w-full"
          />
        </div>
        {/* email  */}
        <div className="md:flex md:flex-row gap-x-[3.7rem] md:w-[46%] w-full">
          <label htmlFor="email" className="text-[12px] text-sirp-grey">
            Email:
          </label>
          <input
            onFocus={() => setIsActive('email')}
            type="email"
            value={user?.email }
            className="text-[13px] px-3 border p-2 rounded-md w-full"
            id="email"
            disabled
          />
        </div>
      </div>
    </div>
  );
}
