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
import BlockModal from "./blockModal";
import ApproveModal from "./ApproveModal";
import RejectModal from "./RejectModal";
import UserService from "@/services/users";
import { CustomModal } from "@/components/ui";
import NotificationService from "@/services/notification.service";
import DeleteModal from "./deleteModal";
import { useDispatch, useSelector } from "react-redux";
import { set } from "date-fns";
import { setDropDown } from "@/redux/reducer/userSlice";
// set number of items to be displayed per page
const calculateRange = (data, rowsPerPage) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};

const sliceData = (data, page, rowsPerPage) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

function CustomTable({
  tableHeaderData,
  tableBodyData,
  rowsPerPage,
  usertype,
}) {
  const { dropDown } = useSelector((state: any) => state?.user);
  const disptch = useDispatch();
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [showDelete, setShowDelete] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [showReject, setShowReject] = useState(false);
  const [showBlock, setShowBlock] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleBlock = async (id) => {
    const response = await UserService.blockUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
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

  const handleReject = async (id) => {
    const response = await UserService.deleteUser(id);
    console.log(response);
    if (response.status) {
      NotificationService.success({
        message: "success!",
        addedText: <p>{response.message}.</p>,
      });
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
  };

  const openBlockModal = (user) => {
    setSelectedUser(user);
    setShowBlock(true);
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

  useEffect(() => {
    disptch(setDropDown(0));
  }, []);

  // set table items to be rendered when table is paginated
  useEffect(() => {
    const range = calculateRange(users, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(users, page, rowsPerPage);
    setSlice([...slice]);
  }, [users, setTableRange, page, setSlice]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await UserService.getUsers();
        if (response.status) {
          setUsers(response.data);
          console.log(response);
        }
      } catch (error) {}
    };
    fetchUsers();
  }, []);
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

  return (
    <TableContainer component={Paper} className="shadow-sm border-r-0">
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
        {users.length > 0 ? (
          <>
            <TableBody>
              {slice?.map((item) => (
                <>
                  <TableRow key={item?.uuid} className="hover:bg-gray-50">
                    <TableCell className="text-xs capitalize hover:cursor-pointer hover:underline">
                      <Link href={`users/${item?.uuid}`}>
                        {item?.firstName} {item?.lastName}
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs capitalize">
                      {item?.role}
                    </TableCell>
                    <TableCell className=" text-xs capitalize">
                      {item.country}
                    </TableCell>
                    <TableCell align="right">
                      <div className="flex gap-x-[0.2rem] items-center">
                        <div
                          className={`rounded-full w-2 h-2 ${
                            item.status === "Online"
                              ? "bg-green-600"
                              : "bg-[#EF4444]"
                          }`}
                        ></div>
                        <p className="text-xs">{item.status}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.verified ? (
                          <div className="flex gap-x-3 items-center">
                          <button
                            className="bg-transparent text-xs p-0 text-[#9F9036]"
                            onClick={() => openBlockModal(item)}
                          >
                            Block
                          </button>
                          <button
                            className="bg-transparent text-xs p-0 text-sirp-primary"
                            onClick={() => openDeleteModal(item)}
                          >
                            Delete
                          </button>
                        </div>
                       
                      ) : (
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
                    {/* {usertype >= 0 ? (
                    <TableCell>
                      <div className="flex gap-x-3 items-center">
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          Chat
                        </button>
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          Block
                        </button>
                        <button className="bg-transparent text-xs p-0 text-sirp-primary">
                          Delete
                        </button>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell>
                      <div className="flex gap-x-3 items-center">
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          Approve
                        </button>
                        <button className="bg-transparent text-xs p-0 text-[#9F9036]">
                          View
                        </button>
                        <button className="bg-transparent text-xs p-0 text-sirp-primary">
                          Reject
                        </button>
                      </div>
                    </TableCell>
                  )} */}
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
    </TableContainer>
  );
}

export default CustomTable;
