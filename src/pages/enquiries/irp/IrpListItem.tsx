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
  const [auditData, setAuditData] = useState(null);
  const itemsPerPage = 49; // Set a constant number of items per page
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(auditData?.page || 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageChange = async (event, page) => {
    setLoading(true);
    setCurrentPage(page);
    try {
      const newAuditData = await UserService.filterByAudit(page, itemsPerPage);
      setAuditData(newAuditData.data);
      console.log(auditData);
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
        const initialAuditData = await UserService?.filterByAudit(
          currentPage,
          itemsPerPage
        );
        // sort items by date in descending order
        let sortedData = {
          ...initialAuditData.data,
          logs: initialAuditData.data.logs.sort(
            (a: any, b: any) => Date.parse(b.time) - Date.parse(a.time)
          ),
        };
        setAuditData(sortedData);
        // console.log('AUDIT DATA:', auditData);
      } catch (error) {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
      }
      setLoading(false);
    }

    // Fetch initial data on component mount
    fetchInitialData();
  }, []); // Empty dependency array to run this effect once

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
              {auditData?.logs
                ? auditData?.logs?.map((item, index) => (
                    <IrpContent
                      key={index}
                      moduleName={item.moduleName || "No module name found"}
                      time={new Date(item.time).toUTCString()} // Format the time
                      actionText={item.moduleAction || "No action found"}
                      userName={
                        item?.remoteUser?.firstName &&
                        item?.remoteUser?.lastName
                          ? `${item?.remoteUser?.firstName} ${item?.remoteUser?.lastName}`
                          : "User Name Not Found"
                      }
                      // docId={item?.id}
                    />
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="me:w-[100%] m-5 flex justify-end items-center">
        {auditData?.pages && (
          <Pagination
            count={Math.ceil(auditData.pages)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        )}
      </div>
    </div>
  );
};

export default IrpListItem;
