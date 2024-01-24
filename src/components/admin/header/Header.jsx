import "./header.css"

import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";

import user_avatar from "../../../assets/img/avatar/avatar.png"
import MenuIcon from "@mui/icons-material/Menu.js";
import {Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem, Typography} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";

const Header = ({handleDrawerToggle}) => {
    const {user, handleLogout} = useAuth()

    const [confirm, setConfirm] = useState(false)
    const handleLogoutClick = () => {
        setConfirm(true)
    }
    useEffect(() => { //on dropdown hide, reset logout confirmation
        const userDropdown = document.getElementById('userDropdown')
        const handleEventListener = () => {
            setConfirm(false)
        }
        userDropdown.addEventListener('hide.bs.dropdown', handleEventListener)

        return () => {
            userDropdown.removeEventListener('scroll', handleEventListener);
        };
    }, []);


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                {/*// <!-- Sidebar Toggle (Topbar) -->*/}
                {/*<button onClick={handleEvent} id="sidebarToggleTop" className="btn btn-link rounded-circle mx-3 d-flex justify-content-center align-items-center"> d-md-none
                    <FaBars></FaBars>
                </button>*/}

                <IconButton
                    color="primary"
                    aria-label="open drawer"
                    //edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        ml: 2,
                        //display: { lg: 'none' }
                    }}
                >
                    <MenuIcon />
                </IconButton>

                {/*// <!-- Topbar Navbar -->*/}
                <ul className="navbar-nav ms-auto">
                    {/*// <!-- Nav Item - User Information -->*/}
                    <li className="nav-item dropdown no-arrow">
                        <button className="nav-link dropdown-toggle" id="userDropdown" role="button"
                           data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                            <span className="mx-2 d-inline text-gray-600 small">{user ? user.name : "user"}</span>
                            <img className="img-profile rounded-circle" src={user_avatar} alt={"User Avatar"}/>
                        </button>
                        {/*// <!-- Dropdown - User Information -->*/}
                        <div className="dropdown-menu dropdown-menu-end shadow animated--grow-in" aria-labelledby="userDropdown">
                            <button className="dropdown-item text">
                                Theme
                            </button>
                            <div className="dropdown-divider"></div>
                            <button hidden={confirm} className="dropdown-item logout" onClick={handleLogoutClick}>
                                Logout
                            </button>
                            <button hidden={!confirm} className="dropdown-item logout" onClick={handleLogout}>
                                <span className={"text-danger"}>Are you sure?</span>
                            </button>

                        </div>
                    </li>

                </ul>

                <Typography>{user ? user.name : "user"}</Typography>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 1, mr: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>

            </nav>
        </>
)
}

export default Header;