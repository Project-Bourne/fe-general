import React, { useState } from "react";

function AddUserModal({ closeModal, handleAddRoles }) {
  const [formData, setFormData] = useState({
    name: "",
    permissions: "",
    level: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const permissions = formData.permissions.split(",").map((permission) => permission.trim());
    const data = {
      roleName: formData.name,
      permissions,
      level: formData.level,
    };
    handleAddRoles(data);
    closeModal();
  };

  return (
    <>
      <h1 className="font-semibold text-[24px] px-2 mb-3"> Add new role </h1>
      <div className="grid pb-5 pt-2 px-2">
        <form className="w-full border-r-gray-100 mb-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm">Role Name</label>
            <input
              type="text"
              className="w-full my-2 border p-2 capitalize rounded-[.5rem]"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Role Permissions</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="text"
              name="permissions"
              value={formData.permissions}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Role Level</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="number"
              name="level"
              min={0}
              max={100}
              value={formData.level}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sirp-primary rounded-[1rem] text-white p-2 mt-3 shadow-md"
          >
            Add Role
          </button>
        </form>
      </div>
    </>
  );
}

export default AddUserModal;
