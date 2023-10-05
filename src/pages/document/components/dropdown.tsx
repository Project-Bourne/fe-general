import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useDispatch, useSelector } from "react-redux";
import {
  setDropDown,
  setDropDownName,
  setRoles,
  setDeleteStatus,
} from "@/redux/reducer/userSlice";
import UserService from "@/services/users";
import NotificationService from "@/services/notification.service";

export default function SplitButton() {
  const dispatch = useDispatch();
  const { dropDown, dropDownName } = useSelector((state: any) => state.user);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [options, setOptions] = React.useState([]);
  const [selectedRoleId, setSelectedRoleId] = React.useState<string | null>(
    dropDown // Initialize selectedRoleId with the value from Redux
  );
  const [selectedRoleName, setSelectedRoleName] = React.useState(dropDownName);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await UserService.getUserRoles();
        if (response.status) {
          const data = response.data;
          dispatch(setRoles(data));
          // Now, options will contain the roles with UUIDs
          setOptions(
            data.map((roleData) => ({
              id: roleData.uuid,
              role: roleData.roleName,
            }))
          );
        } else {
          NotificationService.error({
            message: "Error!",
            addedText: <p>{response.message}</p>,
          });
        }
      } catch (error) {
        NotificationService.error({
          message: "Error!",
          addedText: <p>{error.message}</p>,
        });
        // Handle the error as needed
      }
    };

    getRoles();
  }, []); // Empty dependency array to run this effect only once

  const handleRoleClick = (roleId: string | null, roleName: string) => {
    setSelectedRoleId(roleId);
    dispatch(setDropDown(roleId));
    dispatch(setDropDownName(roleName));
    setSelectedRoleName(roleName);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef}>
        <Button onClick={() => handleRoleClick(dropDown, dropDownName)}>
          {selectedRoleName !== "" ? selectedRoleName : dropDownName}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem
                    selected={selectedRoleId === null}
                    onClick={() => handleRoleClick("all", "All")}
                  >
                    All
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem
                      key={option.id}
                      selected={selectedRoleId === option.id}
                      onClick={() => {handleRoleClick(option.id, option.role)
                        dispatch(setDeleteStatus(false));
                      }}
                      className="capitalize"
                    >
                      {option.role}
                    </MenuItem>
                  ))}
                  <MenuItem
                    selected={selectedRoleName === "Pending"}
                    onClick={() => {handleRoleClick("pending", "Pending")
                    dispatch(setDeleteStatus(false));
                  }}
                  >
                    Pending
                  </MenuItem>
                  <MenuItem
                    selected={selectedRoleName === "Approved"}
                    onClick={() => {handleRoleClick("verified", "Approved")
                    dispatch(setDeleteStatus(false));
                  }}
                  >
                    Approved
                  </MenuItem>
                  <MenuItem
                    selected={selectedRoleName === "Blocked"}
                    onClick={() => {
                      handleRoleClick("blocked", "Blocked");
                      dispatch(setDeleteStatus(false));
                    }}
                  >
                    Blocked
                  </MenuItem>
                  <MenuItem
                    selected={selectedRoleName === "Rejected"}
                    onClick={() => {
                      handleRoleClick("rejected", "Rejected");
                      dispatch(setDeleteStatus(false));
                    }}
                  >
                    Rejected
                  </MenuItem>
                  <MenuItem
                    selected={selectedRoleName === "Deleted"}
                    onClick={() => {
                      handleRoleClick("deleted", "Deleted");
                      dispatch(setDeleteStatus(true));
                      console;
                    }}
                  >
                    Deleted
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
