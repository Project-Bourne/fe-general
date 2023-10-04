import { Button, CustomModal } from "@/components/ui";
import UserService from "@/services/users";
import Image from "next/image";
import SplitButton from "./dropdown";
import { useState } from "react";
import { HeaderModel } from "../models/users.module";
import AddSourceModal from "./AddSourceModal";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";

function Header() {
  const [toggleModal, setToggleModal] = useState(false);

  const closeModalHandler = () => {
    setToggleModal(false);
  };

  return (
    <>
      <div className="flex justify-between pl-5 pr-2  py-3">
        <h1 className="text-[30px]">Sources</h1>
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
            onClick={() => setToggleModal(true)}
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
                <label className="text-white">Add Source</label>
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
          <AddSourceModal closeModal={closeModalHandler} />
        </CustomModal>
      )}
    </>
  );
}

export default Header;
