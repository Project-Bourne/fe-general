import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableFooter } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import BlockModal from "./BlockModal";
import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";
import UserService from "@/services/users";
import { CustomModal } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import DeleteModal from "./deleteModal";
import { useDispatch, useSelector } from "react-redux";
import UnblockModal from "./UnblockModal";
import Loader from "@/components/ui/Loader";

// set number of items to be displayed per pag
function CustomTable({
  tableHeaderData,
  tableBodyData,
  rowsPerPage,
  usertype,
}) {
  const dispatch = useDispatch();
  const { deleteStatus } = useSelector((state: any) => state.user);
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [showUnblock, setShowUnblock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  //this state is to reload the table
  const [isBlocked, setIsBlocked] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isUnblocked, setIsUnblocked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { dropDown } = useSelector((state: any) => state?.user);
  const [showMore, setShowMore] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        if (isMostlyNumbers(dropDown)) {
          // It's mostly numbers, treat it as a number
          const response = await UserService.filterByRoles(dropDown);
          const data = response.data;
          setUsers(data);
        } else {
          // It's mostly text, treat it as text
          const response = await UserService.filterByAction(dropDown);
          const data = response.data;
          setUsers(data);
        }
        setIsLoading(false); // Set isLoading to false when data fetching is complete
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Set isLoading to false in case of an error
      }
    };

    function isMostlyNumbers(value) {
      // Count the number of digits in the value
      const digitCount = (value.match(/\d/g) || []).length;
      const letterCount = (value.match(/[a-zA-Z]/g) || []).length;

      // If there are more digits than letters, consider it mostly numbers
      return digitCount >= letterCount;
    }

    fetchData(); // Call the async function
  }, [
    dispatch,
    dropDown,
    isBlocked,
    isRejected,
    isApproved,
    isUnblocked,
    isDeleted,
  ]);

  const handleBlock = async (id) => {
    const response = await UserService.blockUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
      setIsBlocked(true);
    } else {
      NotificationService.error({
        message: "error!",
        addedText: (
          <p>{response.message}. Something went wrong, please try again</p>
        ),
      });
    }
    setShowBlock(false);
  };

  const handleDelete = async (id) => {
    const response = await UserService.deleteUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
      setIsDeleted(true);
    } else {
      NotificationService.error({
        message: "error!",
        addedText: (
          <p>{response.message}. Something went wrong, please try again</p>
        ),
      });
    }
    setShowDelete(false);
  };

  const handleApprove = async (id) => {
    const response = await UserService.verifyUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
      setIsApproved(true);
    } else {
      NotificationService.error({
        message: "error!",
        addedText: (
          <p>{response.message}. Something went wrong, please try again</p>
        ),
      });
    }
    setShowApprove(false);
  };

  const handleUnblock = async (id) => {
    const response = await UserService.unBlockUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
      setIsUnblocked(true);
    } else {
      NotificationService.error({
        message: "error!",
        addedText: (
          <p>{response.message}. Something went wrong, please try again</p>
        ),
      });
    }
    setShowUnblock(false);
  };
  
  const handleReject = async (id) => {
    const response = await UserService.rejecteUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
      setIsRejected(true);
    } else {
      NotificationService.error({
        message: "error!",
        addedText: (
          <p>{response.message}. Something went wrong, please try again</p>
        ),
      });
    }
    setShowReject(false);
  };

  const cancelblock = () => {
    setShowBlock(false);
    setShowDelete(false);
    setShowApprove(false);
    setShowReject(false);
    setShowUnblock(false);
  };

  const openBlockModal = (user) => {
    setSelectedUser(user);
    setShowBlock(true);
  };

  const openUnblockModal = (user) => {
    setSelectedUser(user);
    setShowUnblock(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDelete(true);
  };

  const openApproveModal = (user) => {
    setSelectedUser(user);
    setShowApprove(true);
  };
  const openRejectModal = (user) => {
    setSelectedUser(user);
    setShowReject(true);
  };

  //   table footer
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  // handle paginate buttons
  const handlePaginate = (
    event: React.MouseEvent<HTMLButtonElement>,
    type: string
  ) => {
    event.preventDefault();
    if (type === "next") {
      if (page < tableRange.length) setPage(page + 1);
    }
    if (type === "back") {
      if (page > 1) setPage(page - 1);
    }
  };

  const toggleExpandedRow = (index) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((rowIndex) => rowIndex !== index));
    } else {
      setExpandedRows([...expandedRows, index]);
    }
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
      <Table sx={{ minWidth: 650 }}>
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
        {Array.isArray(users) && users.length > 0 ? (
          <>
            <TableBody>
              {users?.map((item, index) => (
                <>
                  <TableRow key={item?.uuid} className="hover:bg-gray-50">
                    <TableCell className="text-xs capitalize hover:cursor-pointer hover:underline">
                      <Link href={`users/${item?.uuid}`}>
                        {item?.firstName} {item?.lastName}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs capitalize">
                      {item?.role?.roleName}
                    </TableCell>
                    <TableCell className="text-xs capitalize">
                      {item.country.map((countryName, countryIndex) => (
                        <span key={countryIndex}>
                          {countryIndex < 2 || expandedRows.includes(index)
                            ? `${countryName}, `
                            : ""}
                        </span>
                      ))}
                      {item.country.length > 2 && (
                        <span>
                          <button
                            className="text-sirp-primary hover:underline"
                            onClick={() => toggleExpandedRow(index)}
                          >
                            {expandedRows.includes(index)
                              ? "Less"
                              : `+${item.country.length - 2} More`}
                          </button>
                        </span>
                      )}
                    </TableCell>

                    <TableCell align="right">
                      <div className="flex gap-x-[0.2rem] items-center">
                        <div
                          className={`rounded-full w-2 h-2 ${
                            item.onlineStatus === "1"
                              ? "bg-green-600"
                              : "bg-[#EF4444]"
                          }`}
                        ></div>
                        <p className="text-xs">
                          {item.onlineStatus === "1" ? "Online" : "Offline"}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {deleteStatus ? (
                        <span>User Deleted</span>
                      ) : item.verified ? (
                        // User is verified
                        <div className="flex gap-x-3 items-center">
                          {item.blocked ? (
                            // User is verified and blocked
                            <button
                              className="bg-transparent text-xs p-0 text-[#9F9036]"
                              onClick={() => openUnblockModal(item)}
                            >
                              Unblock
                            </button>
                          ) : (
                            // User is verified but not blocked
                            <button
                              className="bg-transparent text-xs p-0 text-[#9F9036]"
                              onClick={() => openBlockModal(item)}
                            >
                              Block
                            </button>
                          )}

                          <button
                            className="bg-transparent text-xs p-0 text-sirp-primary"
                            onClick={() => openDeleteModal(item)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : item.delete ? (
                        // User is not verified and deleted
                        <span>User Rejected</span>
                      ) : (
                        // User is not verified but not deleted
                        <div className="flex gap-x-3 items-center">
                          <button
                            className="bg-transparent text-xs p-0 text-[#9F9036]"
                            onClick={() => openApproveModal(item)}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-transparent text-xs p-0 text-sirp-primary"
                            onClick={() => openRejectModal(item)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>
                  <div className="flex justify-end px-[5rem]">
                    {page > 1 && (
                      <>
                        <button onClick={(e) => handlePaginate(e, "back")}>
                          &lt;
                        </button>{" "}
                        &nbsp;&nbsp;
                      </>
                    )}
                    Page {page} of {tableRange.length} &nbsp;&nbsp;
                    {page !== tableRange.length && (
                      <>
                        <button onClick={(e) => handlePaginate(e, "next")}>
                          &gt;
                        </button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
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

      {/* modal for block user, delete user, approve user, reject user, unblock user  */}

      {selectedUser && showBlock && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowBlock(false)}
        >
          <BlockModal
            handleBlock={() => handleBlock(selectedUser.uuid)}
            cancelblock={cancelblock}
            user={selectedUser}
          />
        </CustomModal>
      )}
      {selectedUser && showDelete && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowDelete(false)}
        >
          <DeleteModal
            handleDelete={() => handleDelete(selectedUser.uuid)}
            cancelblock={cancelblock}
            user={selectedUser}
          />
        </CustomModal>
      )}
      {selectedUser && showApprove && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowApprove(false)}
        >
          <ApproveModal
            handleApprove={() => handleApprove(selectedUser.uuid)}
            cancelblock={cancelblock}
            user={selectedUser}
          />
        </CustomModal>
      )}
      {selectedUser && showReject && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowReject(false)}
        >
          <RejectModal
            handleReject={() => handleReject(selectedUser.uuid)}
            cancelblock={cancelblock}
            user={selectedUser}
          />
        </CustomModal>
      )}
      {selectedUser && showUnblock && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowUnblock(false)}
        >
          <UnblockModal
            handleUnblock={() => handleUnblock(selectedUser.uuid)}
            cancelblock={cancelblock}
            user={selectedUser}
          />
        </CustomModal>
      )}
    </TableContainer>
  );
}

export default CustomTable;
