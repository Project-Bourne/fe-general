import { Button, CustomModal } from "@/components/ui";
import UserService from "@/services/users";
import Image from "next/image";
import SplitButton from "./dropdown";
import { useEffect, useState } from "react";
import { HeaderModel } from "../../../utils/mainUsers.module";
import AddUserModal from "./AddUserModal";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import Loader from "@/components/ui/Loader";
import { setAddReload } from "@/redux/reducer/userSlice";
import { useDispatch } from "react-redux";

function Header( props) {
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const closeModalHandler = () => {
    setToggleModal(false);
  };

  const openModalHandler = () => {
    setToggleModal(true);
    dispatch(setAddReload(false));
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }
  , [isLoading]);



  return (
    <>
      <div className="flex justify-between pl-5 pr-2  py-3">
      {isLoading && (
        <CustomModal
          style="md:w-[50%] w-[90%] h-[100%] md:h-[100vh] relative top-[5%] rounded-xl mx-auto pt-[4rem] px-3 pb-5"
          closeModal={() => {
            setIsLoading(false);
          }}
        >
          <div className="flex flex-row justify-center items-center">
            <Loader />
          </div>
        </CustomModal>
      )}
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
            onClick={openModalHandler}
            size="sm"
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
