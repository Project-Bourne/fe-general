import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { CustomModal } from "@/components/ui";
import Auth from "@/services/auth.service"
import NotificationService from "@/services/notification.service";
import {  useDispatch, useSelector } from "react-redux";
import Loader from "@/components/ui/Loader";
import RolesService from "@/services/roles";
import { Tooltip } from "@mui/material";
import EditeModal from "./EditModal";
import DeleteModal from "./deleteModal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { setUserInfo } from "@/redux/reducer/authReducer";
import { logout } from "@/hooks/api";

// set number of items to be displayed per pag
function CustomTable({ tableHeaderData }) {
  const dispatch = useDispatch()
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState({});
  const { reload } = useSelector((state: any) => state?.user);

  useEffect(() => {
    Auth.getUserViaAccessToken()
      .then((response) => {
        if (response?.status) {
          dispatch(setUserInfo(response?.data));
        }
      })
      .catch((err) => {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{`Access forbidden. Redirecting to login page.`}</p>,
          position: "top-center",
        });
        logout();
      });
  }, []); 

  const EditRoles = (roles) => {
    setSelectedRoles(roles);
    setShowEdit(true);
  };

  const DeleteRoles = (roles) => {
    setSelectedRoles(roles);
    setShowDelete(true);
  };

  useEffect(() => {
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const response = await RolesService.getAllRoles();
      if (response.status) {
        const data = response.data;
        setRoles(data);
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
      setIsLoading(false); // Set isLoading to false when data fetching is complete (whether it succeeds or fails)
    }
  };

  const handleEdit = async (editedSource) => {
    const roleId = editedSource.uuid;

    setIsLoading(true);
    try {
      // Ensure that the editedSource object contains the required properties
      const editedRole = {
        roleName: editedSource.roleName,
        level: editedSource.level,
        permissions: editedSource.permissions,
      };

      // Add the ID of the role you want to edit (replace 'YOUR_ROLE_ID' with the actual ID)
      // Call your service to edit the role with the updated role object and the ID
      const response = await RolesService.EditRoles(roleId, editedRole);

      if (response.status) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>Role updated successfully</p>,
          position: "top-center",
        });
        setIsLoading(false);
        fetchData(); // Refetch the roles list or update the state as needed
      } else {
        NotificationService.error({
          message: "Error!",
          addedText: <p>Something happened. Please try again</p>,
          position: "top-center",
        });
        setIsLoading(false);
      }
    } catch (error) {
      NotificationService.error({
        message: "Error!",
        addedText: <p>{error}, Something happened. Please try again</p>,
        position: "top-center",
      });
      setIsLoading(false);
    }
  };

  const handleDelete = async (deletedRoles) => {
    setIsLoading(true);
    try {
      const response = await RolesService.DeleteRoles(deletedRoles);
      if (response.status) {
        NotificationService.success({
          message: "Success!",
          addedText: <p>Role deleted successfully</p>,
          position: "top-center",
        });
        setIsLoading(false);
        fetchData();
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
      {/* header section  */}
    
      <div className="sticky mt-[3.4rem]">
        <Table sx={{ minWidth: 650 }} className="">
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
      <Table sx={{ minWidth: 650 }} className="">
        {Array.isArray(roles) && roles.length > 0 ? (
          <>
            <TableBody>
              {roles?.map((item, index) => (
                <>
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="text-xs capitalize w-[23.8rem]">
                      {item?.roleName}
                    </TableCell>
                    <TableCell className="text-xs capitalize font-bold  w-[26.5rem] ">
                      { item.permissions.join(', ')}
                      {/* {item.permissions.map((permission, permissionIndex) => (
                        <div key={permissionIndex}>{permission}</div>
                      ))} */}
                    </TableCell>
                    <TableCell className="text-md capitalize font-bold  w-[15rem] ">
                      {item?.level}
                    </TableCell>
                    <TableCell className="text-xs capitalize">
                      <div className="flex gap-5 items-center">
                        <Tooltip title="Edit">
                          <EditIcon
                            className="bg-transparent text-xs hover:cursor-pointer"
                            onClick={() => EditRoles(item)}
                            color={'info'}
                          />
                        </Tooltip>
                        <Tooltip title="Delete">
                          <DeleteIcon
                            className="bg-transparent text-xs hover:cursor-pointer"
                            onClick={() => DeleteRoles(item)}
                            color={'error'}
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
      {selectedRoles && showEdit && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[10%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowEdit(false)}
        >
          <EditeModal
            handleEdit={handleEdit}
            cancelEditModal={cancelModal}
            roles={selectedRoles}
          />
        </CustomModal>
      )}
      {selectedRoles && showDelete && (
        <CustomModal
          style="bg-white md:w-[30%] w-[90%] relative top-[20%] rounded-xl mx-auto pt-3 px-3 pb-5"
          closeModal={() => setShowDelete(false)}
        >
          <DeleteModal
            handleDelete={handleDelete}
            cancelModal={cancelModal}
            roles={selectedRoles}
          />
        </CustomModal>
      )}
    </TableContainer>
  );
}

export default CustomTable;
