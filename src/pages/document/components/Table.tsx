import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { CustomModal } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import Loader from "@/components/ui/Loader";
import { format} from "date-fns";
import { Tooltip } from "@mui/material";
import DeleteModal from "./deleteModal";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

// set number of items to be displayed per pag
function CustomTable({ tableHeaderData }) {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showView, setShowView] = useState(false);
  const [reload, setReload] = useState(false); // This is used to reload the data after a successful delete
  const [selectedDocuments, setSelectedDocuments] = useState(null);
  const [ViewDocument, setViewDocuments] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  const DeleteDocuments = (id) => {
    setSelectedDocuments(id);
    setShowDelete(true);
  };

  const ViewDocuments = (id) => {
    setIsLoading(true);
    handleViewDocument(id.uuid);
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://192.81.213.226:81/89/api/v1/upload/docs"
      );
      if (response.status) {
        const data = await response.json();
        const docs = data.data.docs;
        setDocuments(docs);
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: <p>Something happened. Please try again</p>,
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when data fetching is complete (whether it succeeds or fails)
    }
  };

  const handleViewDocument = async (id) => {
    try {
      const response = await fetch(
        `http://192.81.213.226:81/89/api/v1/download/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status) {
        const responseData = await response.json();
        const data = responseData.data.text;
        const link = responseData.data.url;
        setIsLoading(false);
        setDownloadLink(link);
        setViewDocuments(data);
        setShowView(true);
        NotificationService.success({
          message: "Success!",
          addedText: <p> file loaded successful</p>,
          position: "top-center",
        });
        setReload(!reload);
        setShowDelete(false);
        fetchData(); // Refresh data after successful delete
      } else {
        const responseData = await response.json();
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: (
          <p>{`${error.message} Something happened. Please try again`}</p>
        ),
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when the delete operation is complete
    }
  };

  const handeleDownload = async () => {
    try {
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "file.pdf";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          setIsLoading(false);
          setShowView(true);
        } else {
          // Handle the error case
          // You can display an error message or do something else
        }
      } else {
        // Handle the case where downloadLink is missing or empty
      }
    } catch (error) {
      // Handle the exception
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://192.81.213.226:81/89/api/v1/upload/remove/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.status) {
        const responseData = await response.json();
        NotificationService.success({
          message: "Success!",
          addedText: <p>{responseData.message}.</p>,
          position: "top-center",
        });
        setReload(!reload);
        setShowDelete(false);
        fetchData(); // Refresh data after successful delete
      } else {
        const responseData = await response.json();
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: (
          <p>{`${error.message} Something happened. Please try again`}</p>
        ),
        position: "top-center",
      });
    } finally {
      setIsLoading(false); // Set isLoading to false when the delete operation is complete
    }
  };

  const cancelModal = () => {
    setShowDelete(false);
    setShowView(false);
    setIsLoading(false);
  };


  return (
    <TableContainer component={Paper} className="shadow-sm border-r-0">
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
      <div className="mt-[3.3rem] fixed">
        <Table sx={{ minWidth: 1150 }}>
          <TableHead className="bg-gray-100">
            <TableRow>
              {tableHeaderData?.map((title: string, index: number) => (
                <TableCell
                  key={index}
                  align={`${!title[0] ? "right" : "left"}`}
                  scope="col"
                >
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </div>
      <Table sx={{ minWidth: 650 }} className="mt-[8rem]">
        {Array.isArray(documents) && documents.length > 0 ? (
          <>
            <TableBody>
              {documents?.map((item, index) => (
                <>
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-xs capitalize w-[25rem]">
                      {item?.name}
                    </TableCell>
                    <TableCell className="text-xs   w-[23rem]">{item?.type}</TableCell>
                     {/* <TableCell className="text-xs text-center w-[12rem]">{item?.classified == '1' ? 'Yes' : 'No'}</TableCell> */}
                    <TableCell className="text-xs w-[11rem] ">
                      {item?.createdAt
                        ? format(
                            new Date(item.createdAt),
                            "yyyy-MM-dd HH:mm:ss"
                          )
                        : ""}
                    </TableCell>{" "}
                    <TableCell className="text-xs capitalize ">
                      <div className="flex items-center gap-5">
                        <Tooltip title="view document">
                          <VisibilityIcon
                            className="bg-transparent text-xs hover:cursor-pointer"
                            onClick={() => ViewDocuments(item)}
                          />
                        </Tooltip>
                        <Tooltip title="Delete document">
                          <DeleteIcon
                            className="bg-transparent text-xs hover:cursor-pointer"
                            onClick={() => DeleteDocuments(item)}
                          />
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
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
      {selectedDocuments && showDelete && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowDelete(false)}
        >
          <DeleteModal
            handleDelete={() => handleDelete(selectedDocuments.uuid)}
            cancelModal={cancelModal}
            documents={selectedDocuments}
          />
        </CustomModal>
      )}
      {showView && (
        <CustomModal
          style="bg-white md:w-[50%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-5 px-5 pb-5"
          closeModal={() => setShowView(false)}
        >
          <Tooltip title="Download document">
            <DownloadIcon
              className="cursor-pointer"
              onClick={() => handeleDownload()}
            />
          </Tooltip>

          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            <p className="text-md text-justify">{ViewDocument}</p>
          </div>
        </CustomModal>
      )}
    </TableContainer>
  );
}

export default CustomTable;
