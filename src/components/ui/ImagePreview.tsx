function ImagePreview(props) {
    const { file, handleUploadCancel, handleAddPhoto } = props;
    const cancel = () => handleUploadCancel();
    const addPhoto = () => handleAddPhoto();
  
    return (
      <div>
        <img src={file} alt="image" className="flex justify-center" />
        <div className="flex gap-x-5 justify-end mt-4">
          <div
            onClick={addPhoto}
            className="flex flex-row items-center border border-sirp-primary bg-sirp-primary rounded-md px-4 py-2 cursor-pointer"
          >
            <h2 className="text-[13px] text-white">Add Photo</h2>
          </div>
  
          <div
            onClick={cancel}
            className="flex flex-row items-center border border-sirp-lightGrey bg-sirp-lightGrey rounded-md px-4 py-2 cursor-pointer"
          >
            <h2 className="text-[13px] text-sirp-grey">Cancel</h2>
          </div>
        </div>
      </div>
    );
  }
  
  export default ImagePreview;