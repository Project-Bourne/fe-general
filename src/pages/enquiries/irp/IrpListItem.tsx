import React, { useEffect, useState } from "react";
import IrpContent from "./irpContent";
import UserService from "@/services/users";
import NotificationService from "@/services/notification.service";
import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { CustomModal } from "@/components/ui";
import Loader from "@/components/ui/Loader";

/**
 * This function fetches Enquiries logs from the server and displays them in a table.
 * It also handles pagination and sorting.
 */
const IrpListItem = () => {
  const [enquiriesData, setEnquiriesData] = useState(null);
  const itemsPerPage = 49;
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    enquiriesData?.currentPage || 1
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = async (event, page) => {
    setLoading(true);
    setCurrentPage(page);
    try {
      const newEnquiriesData = await UserService.enquiries(page, itemsPerPage);
      setEnquiriesData(newEnquiriesData.data);
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: <p>Something happened. Please try again</p>,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function fetchInitialData() {
      setLoading(true);
      try {
        const initialEnquiriesData = await UserService?.enquiries(
          currentPage,
          itemsPerPage
        );

        // Sort items by date in descending order
        let sortedData = {
          ...initialEnquiriesData.data,
          feedbacks: initialEnquiriesData?.data.feedbacks?.sort(
            (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt)
          ),
        };

        setEnquiriesData(sortedData);
      } catch (error) {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
      } finally {
        setLoading(false);
      }
    }

    // Fetch initial data on component mount
    fetchInitialData();
  }, [currentPage, itemsPerPage]);

  return (
    <div>
      {loading && (
        <CustomModal
          style="md:w-[50%] w-[90%] h-[100%] md:h-[100vh] relative top-[5%] rounded-xl mx-auto pt-[4rem] px-3 pb-5"
          closeModal={() => {
            setLoading(false);
          }}
        >
          <div className="flex flex-row justify-center items-center">
            <Loader />
          </div>
        </CustomModal>
      )}
      <div className="w-full h-[100%] overflow-y-scroll flex flex-col gap-4">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="!font-bold !text-md !text-sirp-primary">
                  User
                </TableCell>
                <TableCell
                  align="right"
                  className="!font-bold !text-md !text-sirp-primary"
                >
                  Comments
                </TableCell>
                <TableCell
                  align="right"
                  className="!font-bold !text-md !text-sirp-primary"
                >
                  Module
                </TableCell>

                <TableCell
                  align="right"
                  className="!font-bold !text-md !text-sirp-primary"
                >
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {enquiriesData?.feedbacks ? (
                enquiriesData?.feedbacks?.map((item, index) => (
                  <IrpContent
                    key={index}
                    moduleName={item.module || "No module name found"}
                    time={new Date(item.updatedAt).toUTCString()} // Format the time
                    actionText={item.comment || "No comment found"}
                    userName={
                      item?.user?.firstName && item?.user?.lastName
                        ? `${item?.user?.firstName} ${item?.user?.lastName}`
                        : "User Name Not Found"
                    }
                    // docId={item?.id}
                  />
                ))
              ) : (
                <p>No data available</p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="me:w-[100%] m-5 flex justify-end items-center">
        {enquiriesData?.currentPage && (
          <Pagination
            count={enquiriesData?.totalPages || 1}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
            disabled={enquiriesData?.totalPages === 1}
          />
        )}
      </div>
    </div>
  );
};

export default IrpListItem;
