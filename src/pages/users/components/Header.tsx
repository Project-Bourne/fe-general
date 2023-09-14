import { Button, CustomModal } from "@/components/ui";
import UserService from "@/services/users";
import Image from "next/image";
import SplitButton from "./dropdown";
import { useState } from "react";
import { UserRoles } from "@/utils/constants";
import { HeaderModel } from "../models/users.module";
import NotificationService from "@/services/notification.service";
import AddUserModal from "./AddUserModal";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

function Header() {
  const [toggleModal, setToggleModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "",
    country: "",
  });
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: "",
  });

  const handleSetCountry = (data: any) => {
    setFormData({ ...formData, country: data });
    console.log("header", data);
  };
  // handle modal form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await UserService.createUser(formData);
    if (response.data) {
      NotificationService.success({
        message: "success!",
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
    }
    NotificationService.error({
      message: "error!",
      addedText: <p>{response.msg}. please try again</p>,
    });
    console.log(response);
  };

  // const handleEmailChange = (e: any) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     email: e.target.value,
  //   }));
  // };

  const handleEmailChange = (e) => {
    console.log(e.target.value);
    // setFormData({
    //   ...formData,
    //   email: e.target.value
    // })
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

  const closeModalHandler = () => {
    setToggleModal(false);
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
          <div className="flex flex-row items-center gap-1">
            <p className="text-sm">Filter by</p>
            <SplitButton />
          </div>

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
          closeModal={closeModalHandler}
        >
          <AddUserModal closeModal={closeModalHandler} />
        </CustomModal>
      )}
    </>
  );
}

export default Header;
