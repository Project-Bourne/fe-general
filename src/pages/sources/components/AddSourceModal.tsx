import React from "react";
import NotificationService from "@/services/notification.service";
import SourceService from "@/services/sources";

const AddUserModal = (props) => {
  const { setIsLoading, fetchData } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    try {
      const response = await SourceService.AddSource(data);
      if (response.status) {
        console.log(response);
        NotificationService.success({
          message: "Success!",
          addedText: <p>Source updated successfully</p>,
          position: "top-center",
        });
        setIsLoading(false);
        fetchData();
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>something happened. please try again</p>,
          position: "top-center",
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      NotificationService.error({
        message: "Error!",
        addedText: <p> {error}, something happened. please try again</p>, // Using backticks
        position: "top-center",
      });

      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="font-semibold text-[24px] px-2 mb-3"> Add Source </h1>
      <div className="grid pb-5 pt-2 px-2">
        <form className="w-full border-r-gray-100 mb-3" onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="text-sm">Source Name</label>
            <input
              type="text"
              className="w-full my-2 border p-2 capitalize rounded-[.5rem]"
              name="name" // Change the name attribute to "name"
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Source Url</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="text"
              name="url"
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Source Weight</label>
            <input
              className="w-full my-2 border p-2 rounded-[.5rem]"
              type="number"
              name="weight"
              min={0}
              max={100}
              required
            />
          </div>
          <div className="mb-2">
            <label className="text-sm">Crawl</label>
            <select
              className="w-full my-2 border p-2 rounded-[.5rem]"
              name="crawl"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-sirp-primary rounded-[1rem] text-white p-2 mt-3 shadow-md"
          >
            Add Source
          </button>
        </form>
      </div>
    </>
  );
};

export default AddUserModal;
