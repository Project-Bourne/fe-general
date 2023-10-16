import React, { useState } from "react";

const allpermissions = [
  "admin",
  "fact checker",
  "analyser",
  "summarizer",
  "translator",
  "deep chat",
  "collab",
  "interrogator"
]

function EditModal({ cancelEditModal, handleEdit, roles }) {
  const [editedRoles, setEditedRoles] = useState({ ...roles });
  const [permissionsState, setPermissionsState] = useState([...roles.permissions]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "permissions") {
      const updatedPermissionsState = [...permissionsState];
      if (checked) {
        updatedPermissionsState.push(value);
      } else {
        const index = updatedPermissionsState.indexOf(value);
        if (index !== -1) {
          updatedPermissionsState.splice(index, 1);
        }
      }
      setPermissionsState(updatedPermissionsState);
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
  
    // Create a new editedRoles object with updated permissions
    const updatedEditedRoles = { ...editedRoles, permissions: permissionsState };
  
    handleEdit(updatedEditedRoles);
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
            {allpermissions.map((permission) => (
              <label key={permission} className="block">
                <input
                  type="checkbox"
                  name="permissions"
                  value={permission}
                  checked={permissionsState.includes(permission)}
                  onChange={handleChange}
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
