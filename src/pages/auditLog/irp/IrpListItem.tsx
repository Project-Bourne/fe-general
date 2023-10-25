import React, { useEffect, useState } from "react";
import IrpContent from "./irpContent";
import UserService from "@/services/users";
import NotificationService from "@/services/notification.service";
import { Pagination } from "@mui/material";
import { CustomModal } from "@/components/ui";
import Loader from "@/components/ui/Loader";

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
        setAuditData(initialAuditData.data);
        console.log(auditData);
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
      <div className="w-full h-[100%] overflow-y-scroll grid grid-cols-2">
        {auditData?.logs
          ? auditData?.logs?.map((item, index) => (
              <IrpContent
                key={index}
                moduleName={item?.moduleName || "No module name ound"}
                time={new Date(item?.time).toLocaleString()} // Format the time
                actionText={item?.moduleAction || "No action found"}
                userName={
                  item?.remoteUser?.firstName && item?.remoteUser?.lastName
                    ? `${item?.remoteUser?.firstName} ${item?.remoteUser?.lastName}`
                    : "User Name Not Found"
                }
                activityText={item?.remoteIP || "No IP address found"}
                // docId={item?.id}
              />
            ))
          : null}
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
