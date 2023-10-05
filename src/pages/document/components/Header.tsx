import { Button, CustomModal } from "@/components/ui";
import Image from "next/image";
import { use, useEffect, useState } from "react";
import SourceService from "@/services/sources";
import NotificationService from "@/services/notification.service";
import AddSourceModal from "./AddSourceModal";
import Loader from "@/components/ui/Loader";
import { useDispatch } from "react-redux";
import { set } from "date-fns";
import { setReload } from "@/redux/reducer/userSlice";

function Header() {
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isLoading]);

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
        <h1 className="text-[30px]">Uploaded Documents</h1>
        <div
          className={`justfiy-content-end flex gap-x-3 
            ? "md:w-[50%] w-[45%]"
            : "md:w-[18%] w-[45%] justify-end mr-5"
            `}
        >
          {/* <Button
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
                <label className="text-white">Uploaded Documents</label>
              </div>
            }
          /> */}
        </div>
      </div>
      {/* {toggleModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[5%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeModalHandler}
        >
          <AddSourceModal
            closeModal={closeModalHandler}
            handleAddSource={handleAddSource}
          />
        </CustomModal>
      )} */}
    </>
  );
}

export default Header;
