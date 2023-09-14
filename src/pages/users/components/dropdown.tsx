import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { useDispatch, useSelector } from 'react-redux';
import { setDropDown } from '@/redux/reducer/userSlice';

const roleMapping = {
    "0": "All",
    "1": "Admin",
    "2": "Supervisor",
    "3": "Liason Officer",
    "4": "Station Officer",
    "5": "Desk Officer",
    "6": "Analyst",
  };
  
  const options = Object.keys(roleMapping).map((key) => ({
    id: key,
    role: roleMapping[key],
  }));

export default function SplitButton() {
    const dispatch = useDispatch();
    const {dropDown} = useSelector((state: any) => state.user);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedRoleIndex, setSelectedRoleIndex] = React.useState<any>(0); // Default to the first role
    const [selectedStatus, setSelectedStatus] = React.useState(''); // Empty string for status

    const handleRoleClick = (index: any) => {
        setSelectedRoleIndex(index);
        dispatch(setDropDown(index));
        console.log(index);
        setSelectedStatus(''); // Reset the selected status when changing roles
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
                <Button onClick={() => handleRoleClick(dropDown)}>
                    {typeof(dropDown) === 'number' ? options[dropDown].role : dropDown}
                </Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
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
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            key={option.id}
                                            selected={selectedRoleIndex === index}
                                            onClick={() => handleRoleClick(index)}
                                        >
                                            {option.role}
                                        </MenuItem>
                                    ))}
                                    <MenuItem
                                        selected={selectedStatus === 'Pending'}
                                        onClick={() => handleRoleClick('Pending')}
                                    >
                                        Pending
                                    </MenuItem>
                                    <MenuItem
                                        selected={selectedStatus === 'Approved'}
                                        onClick={() => handleRoleClick('Approved')}
                                    >
                                        Approved
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
