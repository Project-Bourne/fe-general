import {
  Button,
  CustomModal,
  // Dropdown,
  DropdownWithFlag,
  // Input,
} from "@/components/ui";
import UserService from '@/services/users'
import Image from "next/image";
import SplitButton from './dropdown'
import { useState } from "react";
import { UserRoles } from "@/utils/constants";
import { HeaderModel } from "../models/users.module";
import NotificationService from '@/services/notification.service';


function Header() {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    country: '',
  });
  const [email, setEmail] =  useState('')
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleSetCountry = (data: any) => {
    setFormData({ ...formData, country: data });
    console.log("header", data);
  };
  // handle modal form submit
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await UserService.createUser(formData)
    if (response.data) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
      setToggleModal(false)
      setFormData({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
        country: '',
      })
    }
    NotificationService.error({
      message: "error!",
      addedText: <p>{response.msg}. please try again</p>,
    });
    console.log(response);
  };


  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      email: newEmail,
    }));
  };

  const handleFirstNameChange = (e) => {
    const newFirstName = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      firstName: newFirstName,
    }));
  };

  const handleLastNameChange = (e) => {
    const newLastName = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      lastName: newLastName,
    }));
  };

  const handlePasswordChange = (e) => {
    const newpassworde = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      password: newpassworde,
    }));
  };

  // add user modal component
  const AddUserModal = () => {
    return (
      <div style={{zIndex: 50000}}>
        <h1 className="font-semibold text-[24px] md:px-7 mb-3"> All Users </h1>
        <div className="flex justify-between">
          <form className="w-full md:w-3/5 grid md:px-7 border-r-[1px] border-r-gray-100 mb-3">
            <div className="mb-2">
              <label className="text-sm">
                Email
              </label>
              <input
                className="w-full my-2 border p-2 rounded-[.5rem]"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm">
                First Name
              </label>
              <input
                className="w-full my-2 border p-2 rounded-[.5rem]"
                type="text"
                value={formData.firstName}
                onChange={handleFirstNameChange}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm">
                Last Name
              </label>
              <input
                className="w-full my-2 border p-2 rounded-[.5rem]"
                type="text"
                value={formData.lastName}
                onChange={handleLastNameChange}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm">
                User role
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-white border border-gray-300 rounded p-2"
              >
                {UserRoles.map((role, i) => (
                  <option key={i} value={i}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-2">
              <label className="text-sm">
                Password
              </label>
              <input
                className="w-full my-2 border p-2 rounded-[.5rem]"
                type="password"
                value={formData.password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="mb-2">
              <label className="text-sm">
                Country
              </label>
              <DropdownWithFlag selectItem={handleSetCountry} style="mt-2" />
            </div>
            <Button
              size="xl"
              background="bg-sirp-primary"
              classNameStyle="text-white p-2 mt-3 shadow-md"
              value="Add User"
              type="submit"
              onClick={handleSubmit}
            />
          </form>
          <div className="hidden md:block md:w-2/5 px-5 text-[12px] ">
            <div className="grid gap-y-1">
              <label>User permissions</label>
              <p className="text-[#6F7A82] mt-1">
                Access to only the country assigned
              </p>
            </div>
            <div className="grid gap-y-1 mt-4">
              <label>States in Austrailia</label>
              <p className="text-[#6F7A82] mt-1">
                New South Wales, Victoria, Queensland, Western Australia, South
                Australia, and Tasmania
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="flex justify-between pl-5 pr-2  py-3">
        <h1 className="text-[30px]">Users</h1>
        <div
          className={`justfiy-content-end flex gap-x-3 
            ? "md:w-[50%] w-[45%]"
            : "md:w-[18%] w-[45%] justify-end mr-5"
            `}
        >
          <SplitButton />
          <Button
            className="flex gap-x-1 items-center"
            onClick={() => setToggleModal(true)}
            size="md"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../assets/icons/add-user.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white">Add User</label>
              </div>
            }
          />
        </div>
      </div>
      {toggleModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[5%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setToggleModal(false)}
        >
          <AddUserModal />
        </CustomModal>
      )}
    </>
  );
}

export default Header;
