import React, { useState } from "react";

function EditModal({ cancelEditModal, handleEdit, source }) {
  const [editedSource, setEditedSource] = useState({ ...source });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSource((prevState) => ({
      ...prevState,
      [name]:
        name === "weight"
          ? parseInt(value, 10)
          : name === "crawl"
          ? value === "true"
          : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cancelEditModal();
    // Call the handleEdit function with the editedSource data
    handleEdit(editedSource);
  };

  return (
    <>
      <h1 className="font-semibold text-[24px] px-2 mb-3"> Edit Source </h1>
      <div className="grid pb-5 pt-2 px-2">
        <form className="w-full border-r-gray-100 mb-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm">Source Name</label>
            <input
              type="text"
              className="w-full my-2 border p-2 capitalize rounded-[.5rem]"
              name="name" // Change the name attribute to "name"
              value={editedSource.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Source Url</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="text"
              name="url"
              value={editedSource.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Source Weight</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="number"
              name="weight"
              min={1}
              max={100}
              value={editedSource.weight}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Crawl</label>
            <select
              className="w-full my-2 border p-2 rounded-[.5rem]"
              name="crawl"
              value={editedSource.crawl} // Convert boolean to string
              onChange={handleChange}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
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
