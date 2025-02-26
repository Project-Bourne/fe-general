import { Button, CustomModal } from "@/components/ui";
import Image from "next/image";
import { useEffect, useState } from "react";
import SourceService from "@/services/sources";
import NotificationService from "@/services/notification.service";
import AddSourceModal from "./AddSourceModal";
import Loader from "@/components/ui/Loader";
import { useDispatch, useSelector } from "react-redux";
import { setReload } from "@/redux/reducer/userSlice";
import TextField from "@mui/material/TextField";

function Header({ source, setSource }) {
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState(""); // State for filter criteria
  const [originalSource, setOriginalSource] = useState(source); // Store the original data source
  const { reload } = useSelector((state: any) => state?.user);

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await SourceService.getAllSources();
      if (response.status) {
        const data = response.data;
        setSource(data);
        setOriginalSource(data); // Update the original data source
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>something happened. please try again</p>,
          position: "top-center",
        });
      }
    } catch (error: any) {
      NotificationService.error({
        message: "Error!",
        addedText: <p> `${error}, something happened. please try again`</p>,
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilter = () => {
    if (!filterCriteria) {
      // If the filter criteria is empty, reset to the original data source
      setSource(originalSource);
    } else {
      const filteredSource = originalSource.filter((item) => {
        const searchCriteria = filterCriteria.toLowerCase();
        return (
          item.name.toLowerCase().includes(searchCriteria) ||
          item.weight.toString().includes(searchCriteria) || // Convert weight to string for search
          item.url.toLowerCase().includes(searchCriteria)
        );
      });
      setSource(filteredSource);
    }
  };
  

  const handleFilterInputChange = (event) => {
    const input = event.target.value;
    setFilterCriteria(input);
    if (input.trim() === "") {
      // If the input is empty or only contains whitespace, reset to the original data source
      setSource(originalSource);
    } else {
      handleFilter();
    }
  };

  const closeModalHandler = () => {
    setToggleModal(false);
  };

  const openAddmodalHandler = () => {
    setToggleModal(true);
    dispatch(setReload(false));
  };

  const handleAddSource = async (data) => {
    setIsLoading(true);
    try {
      const response = await SourceService.AddSource(data);
      if (response.status) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>Source Added Successfully</p>,
          position: "top-center",
        });
        setIsLoading(false);
        dispatch(setReload(true));
        closeModalHandler();
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
        addedText: <p> {error}, Something happened. Please try again</p>,
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
          <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          value={filterCriteria}
          onChange={handleFilterInputChange}
        />
          <Button
            className="flex gap-x-1 items-center"
            onClick={openAddmodalHandler}
            size="sm"
            background="bg-sirp-primary"
            value={
              <div className="flex flex-row gap-x-1 text-[12px] items-center justify-center">
                <Image
                  src={require("../../../assets/icons/add-source.svg")}
                  alt="add user"
                  width={14}
                  height={14}
                  className="self-center"
                  style={{ alignSelf: "center" }}
                  priority
                />
                <label className="text-white hidden lg:block">Add Source</label>
              </div>
            }
          />
        </div>
      </div>

      {toggleModal && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[15%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={closeModalHandler}
        >
          <AddSourceModal
            closeModal={closeModalHandler}
            handleAddSource={handleAddSource}
          />
        </CustomModal>
      )}
    </>
  );
}

export default Header;
