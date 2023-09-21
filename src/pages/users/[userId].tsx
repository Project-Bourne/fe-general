import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { CustomModal, DropdownWithFlag, ImagePreview } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import { setSingleUser, setUpdatedData } from "@/redux/reducer/userSlice";
import UserService from "@/services/users";
import mail from "../../assets/icons/mail.svg";
import user_icon from "../../assets/icons/userIcon.svg";
import delete_icon from "../../assets/icons/delete.svg";
import edit_icon from "../../assets/icons/edit.svg";
const countries = require("../../utils/countries.json");

const ProfileSettings = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef(null);
  const { user } = useSelector((state: any) => state?.user);
  const id = router.query?.userId;
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [country, setCountry] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isTooLarge, setIsTooLarge] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [options, setOptions] = useState([]);
  const [selectedRoleUuid, setSelectedRoleUuid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code block will run only once when the component mounts.
    setFirstname(user?.firstName);
    setLastname(user?.lastName);
    
    const fetchuserData = async () => {
      if (id) {
        const response = await UserService.getUserById(id);
        dispatch(setSingleUser(response.data));
      }
    };
    fetchuserData();
    
    const fetchUserRoles = async () => {
      try {
        const response = await UserService.getUserRoles();
        if (response.status) {
          const data = response.data;
          // Now, options will contain the roles with UUIDs
          setOptions(
            data.map((roleData) => ({
              id: roleData.uuid,
              role: roleData.roleName,
            }))
          );
  
          // Check if the user has a role UUID and set it as the selected role UUID
          if (user?.roleUuid) {
            setSelectedRoleUuid(user.roleUuid);
          }
        } else {
          NotificationService.error({
            message: "Error!",
            addedText: <p>{response.message}</p>,
          });
        }
      } catch (error) {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{error.message}</p>,
        });
        // Handle the error as needed
      }
    };
  
    fetchUserRoles();
  }, []); // Empty dependency array ensures this runs only once
  

  const handleCountrySelect = (selectedCountry) => {
    // Do something with the selected country, e.g., set it in state
    setCountry(selectedCountry);
  };
  

  const handleProfileEditToggle = () => {
    setIsReadOnly(false);
  };
  const handleCancelAll = () => {
    setIsReadOnly(true);
    setSelectedPhoto(null);
    setProfilePhoto(null);
  };

  // image selection
  const handlePhoto = () => {
    hiddenFileInput?.current?.click();
  };
  const handleImageSelection = (event) => {
    setSelectedPhoto({
      url: URL.createObjectURL(event.target.files[0]),
      name: event.target.files[0].name,
      size: event.target.files[0].size,
    });
  };

  const handleAddPhoto = () => {
    const imageSizeInBytes = selectedPhoto.size;
    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (imageSizeInBytes > maxSizeInBytes) {
      setIsTooLarge(true);
      setProfilePhoto(null);
      setSelectedPhoto(null);
      return;
    }
    setIsTooLarge(false);
    setProfilePhoto(selectedPhoto);
    setSelectedPhoto(null);
    setIsReadOnly(false);
  };

  const handleUploadCancel = () => {
    setSelectedPhoto(null);
    setProfilePhoto(null);
  };

  const handleProfileSubmit = (e: any) => {
    const img = profilePhoto?.url;
    if (firstname !== "" && lastname !== "") {
      UserService.updateUser(user?.uuid, { firstname, lastname, img })
        .then((res) => {
          if (res?.status) {
            NotificationService.success({
              message: res?.message,
            });
            dispatch(
              setUpdatedData({
                firstName: firstname,
                lastName: lastname,
                image: img,
              })
            );
          } else {
            NotificationService.error({
              message: "Profile update failed!",
            });
          }
        })
        .catch((err) => {
          NotificationService.error({
            message: "Profile update failed!",
            addedText: err?.message,
          });
        });
    }
    setIsReadOnly(true);
    setProfilePhoto(null);
  };

  return (
    <>
      {/* First View Component */}
      <div className="py-4 px-8 w-full mt-3 border-b-[1.5px]">
        <div className="flex flex-row w-full items-center justify-between">
          <h2 className="font-semibold text-[13px]">Personal Information</h2>
          {!isReadOnly || profilePhoto ? (
            <div className="flex items-center gap-x-3">
              <div
                onClick={handleCancelAll}
                className="flex flex-row items-center border border-sirp-lightGrey bg-sirp-lightGrey rounded-md px-4 py-3 cursor-pointer"
              >
                <h2 className="text-[13px] text-sirp-grey">Cancel</h2>
              </div>

              <div
                onClick={handleProfileSubmit}
                className="flex flex-row items-center border border-sirp-primary rounded-md px-4 py-3 cursor-pointer"
              >
                <h2 className="text-[13px] text-sirp-primary">Submit</h2>
              </div>
            </div>
          ) : (
            <div
              onClick={handleProfileEditToggle}
              className="flex flex-row items-center border border-sirp-primary rounded-md px-4 py-3 cursor-pointer"
            >
              <Image
                src={edit_icon}
                alt="Edit btn"
                width={18}
                height={18}
                style={{
                  fill: "#4582C4",
                  marginRight: 15,
                }}
                priority
              />
              <h2 className="text-[13px] text-sirp-primary">Edit Profile</h2>
            </div>
          )}
        </div>

        {/* Names */}
        <div className="flex flex-row items-center my-[20px] w-full">
          <label htmlFor="name" className="text-[12px] text-sirp-grey">
            Name:{" "}
          </label>

          <div className="ml-[3vh] w-full">
            <input
              placeholder="First name"
              type="text"
              value={firstname}
              onChange={(e: any) => setFirstname(e.target.value)}
              className="text-[12px] capitalize text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-[42%] md:w-[18%]"
              readOnly={isReadOnly}
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastname}
              onChange={(e: any) => setLastname(e.target.value)}
              className="text-[12px] capitalize text-black border-[1.5px] rounded-md py-2 px-4 mx-4 w-[42%] md:w-[18%]"
              readOnly={isReadOnly}
            />
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-row items-center my-[20px] w-full">
          <label htmlFor="email" className="text-[12px] text-sirp-grey">
            Email:{" "}
          </label>

          <div className="ml-[2rem] w-full items-center flex flex-row relative">
            <Image
              src={mail}
              alt="mail"
              width={16}
              height={16}
              className="absolute self-center item-center left-[2.6vh]"
            />

            <input
              type="email"
              name="email"
              value={user?.email ?? "Email"}
              placeholder="Email Address"
              className="text-[12px] text-black border-[1.5px] rounded-md py-2 px-7 mx-4 w-full md:w-[38%]"
              readOnly={true}
            />
          </div>
        </div>
      </div>
      {/* <View1 /> */}

      {/* Second View Component */}
      <div className="py-4 w-full mt-3 border-b-[1.5px]">
        <div className="flex flex-col w-full">
          <h2 className="font-semibold text-[13px] px-8">Profile Picture</h2>
          <div className="flex flex-row w-full items-center my-4 border-b px-8 pb-2">
            <div className="w-[80px]">
              <p className="text-[12px] text-sirp-grey">AVI:</p>
            </div>

            <div className="grid ml-[3vh] items-center bo">
              {/* Profile Image */}
              <div className="flex flex-row items-center">
                <Image
                  src={user_icon}
                  alt="user"
                  width={30}
                  height={30}
                  className="cursor-pointer mx-5"
                  priority
                />

                <div
                  className="px-6 py-2 cursor-pointer border border-sirp-primaryLess1 rounded-md"
                  onClick={handlePhoto}
                >
                  <p className="text-[11px] font-semibold text-sirp-primary">
                    Change
                  </p>
                </div>

                <Image
                  src={delete_icon}
                  alt="delete"
                  width={17}
                  height={17}
                  className="cursor-pointer mx-5"
                  priority
                  onClick={handleUploadCancel}
                />
              </div>

              {profilePhoto && (
                <p className="text-[11px] text-center text-sirp-success my-1">
                  {profilePhoto.name}
                </p>
              )}

              <p
                className={`text-[11px] text-center ${
                  isTooLarge ? "text-red-600" : "text-gray-400"
                }  my-1`}
              >
                JPG, PNG or GIF - 1MB Max
              </p>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={hiddenFileInput}
            onChange={handleImageSelection}
          />
        </div>

        {/* Roles */}
        <div className="flex flex-row items-center my-[20px] w-full px-8">
          <div className="w-[80px]">
            <label htmlFor="role" className="text-[12px] text-sirp-grey">
              Role:
            </label>
          </div>

          <select
            name="userRole"
            value={selectedRoleUuid}
            onChange={(e) => setSelectedRoleUuid(e.target.value)}
            className="text-[12px] text-black border-[1.5px] rounded-md py-2 px-2 w-full md:w-[38%]"
            disabled={isReadOnly}
          >
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.role}
              </option>
            ))}
          </select>
        </div>

        {/* Countries */}
        <div className="flex flex-row items-center my-[20px] w-full px-8">
          <div className="w-[80px]">
            <label htmlFor="email" className="text-[12px] text-sirp-grey">
              Country:{" "}
            </label>
          </div>

          <DropdownWithFlag
            data={countries}
            selectItem={handleCountrySelect}
            className="text-[12px] text-black border-[1.5px] rounded-md py-2 px-7  w-[38%]"
            style={"w-[38%] mx-4"}
            // multiple={tru}
            // isDisabled={isReadOnly}
          />
        </div>
      </div>
      {/* <View2 /> */}

      {selectedPhoto && (
        <CustomModal
          style="bg-white md:w-[25%] w-[70%] relative top-[20%] rounded-xl mx-auto pt-3 md:px-5 px-4 pb-5"
          closeModal={() => setSelectedPhoto(null)}
        >
          <ImagePreview
            file={selectedPhoto?.url}
            handleAddPhoto={handleAddPhoto}
            handleUploadCancel={handleUploadCancel}
          />
        </CustomModal>
      )}
    </>
  );
};

export default ProfileSettings;
