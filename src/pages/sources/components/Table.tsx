import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomModal } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/ui/Loader";
import SourceService from "@/services/sources";
import { Tooltip } from "@mui/material";
import EditeModal from "@/pages/sources/components/EditModal";
import DeleteModal from "./deleteModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setReload } from "@/redux/reducer/userSlice";

// set number of items to be displayed per pag
function CustomTable({ tableHeaderData, source}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedSource, setSelectedSource] = useState([]);

  const EditSources = (source) => {
    setSelectedSource(source);
    setShowEdit(true);
    dispatch(setReload(false));

  };

  const DeleteSources = (source) => {
    setSelectedSource(source);
    setShowDelete(true);
    dispatch(setReload(false));
  };

  // useEffect(() => {
  //   fetchData();
  // }, [reload]);

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true); // Set isLoading to true before making the request
  //     const response = await SourceService.getAllSources();
  //     if (response.status) {
  //       const data = response.data;
  //       setSource(data);
  //     } else {
  //       NotificationService.error({
  //         message: "Error!",
  //         addedText: <p>something happened. please try again</p>,
  //         position: "top-center",
  //       });
  //     }
  //   } catch (error: any) {
  //     NotificationService.error({
  //       message: "Error!",
  //       addedText: <p> `${error}, something happened. please try again`</p>,
  //       position: "top-center",
  //     });
  //   } finally {
  //     setIsLoading(false); // Set isLoading to false when data fetching is complete (whether it succeeds or fails)
  //   }
  // };

  const handleEdit = async (editedSource) => {
    setIsLoading(true);
    try {
      const response = await SourceService.EditSource(editedSource);
      if (response.status) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>Source updated successfully</p>,
          position: "top-center",
        });
        setIsLoading(false);
        dispatch(setReload(true));
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
        addedText: <p> `${error}, something happened. please try again`</p>,
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async (deletedSource) => {
    setIsLoading(true);
    try {
      const response = await SourceService.DeleteSource(deletedSource);
      if (response.status) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>Source deleted successfully. Wait for page to reload</p>,
          position: "top-center",
        });
        setIsLoading(false);
        setTimeout(() => { 
          dispatch(setReload(true));
        }, 2000);
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
        addedText: <p> `${error}, something happened. please try again`</p>,
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  const cancelModal = () => {
    setShowEdit(false);
    setShowDelete(false);
  };

 

  return (
    <>
    <TableContainer component={Paper} className="shadow-sm border-r-0">
      {/* {isLoading && (
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
      )} */}
      <div className="mt-[3.3rem] sticky">
        <Table sx={{ minWidth: 650 }}>
          <TableHead className="bg-gray-100">
            <TableRow>
              {tableHeaderData?.map((title: string, index: number) => (
                <TableCell
                  key={index}
                  // align={`${index === 0 ? "left" : "right"}`}
                  align="left"
                  scope="col"
                  className={
                    index === 0 && 'w-[23.8rem]' ||
                    index === 1 && 'w-[26.5rem]' ||
                    index === 2 && 'w-[15rem]' ||
                    index === 3 && 'w-[15rem]' ||
                    index === 4 && 'w-auto'
                  }
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </div>
      <Table sx={{ minWidth: 650 }} className="">
        {Array.isArray(source) && source.length > 0 ? (
          <>
            <TableBody>
              {source?.map((item, index) => (
                <>
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-xs capitalize w-[23.8rem] ">
                      {item?.name}
                    </TableCell>
                    <TableCell className="text-xs w-[26.5rem]">
                      {item?.url}
                    </TableCell>
                    <TableCell className="text-xs capitalize w-[15rem]">
                      {item?.weight}
                    </TableCell>
                    <TableCell className="text-xs capitalize w-[15rem]">
                      {item.crawl === true || item.crawl === "true"
                        ? "True"
                        : "False"}
                    </TableCell>
                    <TableCell className="text-xs capitalize">
                      <div className="flex gap-x-3 items-center">
                        <Tooltip title="Edit">
                          <EditIcon
                            className="bg-transparent text-xs hover:cursor-pointer"
                            onClick={() => EditSources(item)}
                            color={'info'}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon
                            className="bg-transparent text-xs hover:cursor-pointer"
                            onClick={() => DeleteSources(item)}
                            color={'error'}
                          />
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
            <TableFooter></TableFooter>
          </>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="p-5">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
      {selectedSource && showEdit && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowEdit(false)}
        >
          <EditeModal
            handleEdit={handleEdit}
            cancelEditModal={cancelModal}
            source={selectedSource}
          />
        </CustomModal>
      )}
      {selectedSource && showDelete && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowDelete(false)}
        >
          <DeleteModal
            handleDelete={handleDelete}
            cancelModal={cancelModal}
            source={selectedSource}
          />
        </CustomModal>
      )}
    </TableContainer>
    </>
  );
}

export default CustomTable;
