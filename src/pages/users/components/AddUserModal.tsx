import React, { useState } from "react";
import { DropdownWithFlag } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import UserService from "@/services/users";

const roleMapping = {
  "0": "Super Admin",
  "1": "Admin",
  "2": "Supervisor",
  "3": "Liason Officer",
  "4": "Station Officer",
  "5": "Desk Officer",
  "6": "Analyst",
};

const options = Object.keys(roleMapping).map((key) => ({
  id: key,
  role: roleMapping[key],
}));

const AddUserModal = (props) => {
  const [toggleModal, setToggleModal] = useState(false);

  const [formData, setFormData] = useState({
    // Initialize formData using useState
    email: "",
    firstName: "",
    lastName: "",
    role: "",
    password: "",
    country: "",
  });

  // Define event handlers for input changes
  const handleEmailChange = (e) => {
    setFormData({ ...formData, email: e.target.value });
  };

  const handleFirstNameChange = (e) => {
    setFormData({ ...formData, firstName: e.target.value });
  };

  const handleLastNameChange = (e) => {
    setFormData({ ...formData, lastName: e.target.value });
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleSetCountry = (selectedCountry) => {
    setFormData({ ...formData, country: selectedCountry });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.createUser(formData);
      if (response.data) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>{response.message}.</p>,
        });
        setToggleModal(false);
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          password: "",
          role: "",
          country: "",
        });
        props.closeModal();
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{response.msg} please try again</p>,
        });
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: <p>An error occurred while creating the user.</p>,
      });
    }
  };

  return (
    <div style={{ zIndex: 50000 }}>
      <h1 className="font-semibold text-[24px] md:px-7 mb-3"> All Users </h1>
      <div className="flex justify-between">
        <form
          className="w-full md:w-3/5 grid md:px-7 border-r-[1px] border-r-gray-100 mb-3"
          onSubmit={handleSubmit} // Add onSubmit to the form
        >
          <div className="mb-2">
            <label className="text-sm">Email</label>
            <input
              type="email"
              className="w-full my-2 border p-2 rounded-[.5rem]"
              value={formData.email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">First Name</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="text"
              value={formData.firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Last Name</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="text"
              value={formData.lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">User role</label>
            <select
              value={formData.role}
              onChange={handleRoleChange}
              className="w-full bg-white border border-gray-300 rounded p-2"
            >
              {options.map((role, i) => (
                <option key={i} value={role.role}>
                  {role.role}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="text-sm">Password</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="password"
              value={formData.password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Country</label>
            <DropdownWithFlag selectItem={handleSetCountry} style="mt-2" />
          </div>
          <button
            type="submit"
            className="w-full bg-sirp-primary text-white p-2 mt-3 shadow-md"
          >
            Add User
          </button>
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

export default AddUserModal;
