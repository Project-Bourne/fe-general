import { Button, CustomModal } from "@/components/ui";
import Image from "next/image";
// import SplitButton from "./dropdown";
import { use, useEffect, useState } from "react";
import RolesService from "@/services/roles";
import NotificationService from "@/services/notification.service";
import AddRoleeModal from "./AddRoleModal";
import Loader from "@/components/ui/Loader";
import { useDispatch } from "react-redux";
import { setReload } from "@/redux/reducer/userSlice";
import { useRouter } from "next/router";

function Header() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const closeModalHandler = () => {
    setToggleModal(false);
  };

  const openAddmodalHandler = () => {
    setToggleModal(true);
    dispatch(setReload(false));

  }

  const handleAddRoles = async (data) => {
    setIsLoading(true);
    try {
      const response = await RolesService.AddRole(data);
      if (response.status) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>New Roles added successfully</p>,
          position: "top-center",
        });
        setIsLoading(false);
        dispatch(setReload(true));
        closeModalHandler();
        router.replace("/roles");
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
        setIsLoading(false);
        closeModalHandler();
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: <p> {error}, something happened. Please try again</p>,
        position: "top-center",
      });
      closeModalHandler();
      setIsLoading(false);
    }
  };

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
        <h1 className="text-[30px]">Roles</h1>
        <div
          className={`justfiy-content-end flex gap-x-3 
            ? "md:w-[50%] w-[45%]"
            : "md:w-[18%] w-[45%] justify-end mr-5"
            `}
        >
          {/* <div className="flex flex-row items-center gap-1">
            <p className="text-sm">Filter by</p>
            <SplitButton />
          </div> */}

          <Button
            className="flex gap-x-1 items-center"
            onClick={openAddmodalHandler}

            size="sm"
            background="bg-sirp-primary"
            value={
              <div className="flex gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../assets/icons/add-source.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white hidden lg:flex">Add Roles</label>
              </div>
            }
          />
        </div>
      </div>
      {toggleModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[10%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeModalHandler}
        >
          <AddRoleeModal closeModal={closeModalHandler} handleAddRoles={handleAddRoles} />
        </CustomModal>
      )}
    </>
  );
}

export default Header;
