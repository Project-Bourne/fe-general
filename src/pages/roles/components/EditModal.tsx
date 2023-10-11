import React, { useState } from "react";

function EditModal({ cancelEditModal, handleEdit, roles }) {
  const [editedRoles, setEditedRoles] = useState({ ...roles });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "permissions") {
      // Split the input string into an array by commas
      const permissions = value.split(',').map((permission) => permission.trim());
      setEditedRoles((prevState) => ({
        ...prevState,
        [name]: permissions,
      }));
    } else {
      setEditedRoles((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cancelEditModal();
    handleEdit(editedRoles);
  };

  return (
    <>
      <h1 className="font-semibold text-[24px] px-2 mb-3">Edit roles</h1>
      <div className="grid pb-5 pt-2 px-2">
        <form className="w-full border-r-gray-100 mb-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm">Roles Name</label>
            <input
              type="text"
              className="w-full my-2 border p-2 capitalize rounded-[.5rem]"
              name="roleName"
              value={editedRoles.roleName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Permissions</label>
            <textarea
              className="w-full my-2 border p-2 rounded-[.5rem]"
              name="permissions"
              value={editedRoles.permissions.join(", ")} // Convert permissions array to a string
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
              value={editedRoles.level}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sirp-primary rounded-[1rem] text-white p-2 mt-3 shadow-md"
          >
            Edit Source
          </button>
        </form>
      </div>
    </>
  );
}

export default EditModal;
