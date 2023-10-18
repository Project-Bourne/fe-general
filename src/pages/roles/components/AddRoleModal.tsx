import React, { useState } from "react";

const allPermissions = [
  "admin",
  "irp",
  "fact checker",
  "analyser",
  "summarizer",
  "translator",
  "deep chat",
  "collab",
  "interrogator"
];

function AddUserModal({ closeModal, handleAddRoles }) {
  const [formData, setFormData] = useState({
    roleName: "",
    permissions: [], // Use an array for permissions
    level: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "permissions") {
      const updatedPermissions = [...formData.permissions];
      if (checked) {
        updatedPermissions.push(value);
      } else {
        const index = updatedPermissions.indexOf(value);
        if (index !== -1) {
          updatedPermissions.splice(index, 1);
        }
      }

      setFormData((prevData) => ({
        ...prevData,
        permissions: updatedPermissions,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddRoles(formData);
    closeModal();
  };

  return (
    <>
      <h1 className="font-semibold text-[24px] px-2 mb-3">Add new role</h1>
      <div className="grid pb-5 pt-2 px-2">
        <form className="w-full border-r-gray-100 mb-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm">Role Name</label>
            <input
              type="text"
              className="w-full my-2 border p-2 capitalize rounded-[.5rem]"
              name="roleName" // Corrected name attribute
              value={formData.roleName} // Corrected value attribute
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Role Permissions</label>
            {allPermissions.map((permission) => (
              <label key={permission} className="block capitalize">
                <input
                  type="checkbox"
                  name="permissions"
                  value={permission}
                  checked={formData.permissions.includes(permission)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {permission}
              </label>
            ))}
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
