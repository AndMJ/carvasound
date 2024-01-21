import "./header.css"

import {FaBars} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";

import user_avatar from "../../../assets/img/avatar/avatar.png"

const Header = () => {
    const {user, handleLogout} = useAuth()
    const handleEvent = (e) => {
        e.preventDefault();
        //document.body.classList.toggle('sidebar-toggled');
        document.getElementsByClassName("sidebar")[0].classList.toggle('toggled');
    }


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

    return (
        <>
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

                {/*// <!-- Sidebar Toggle (Topbar) -->*/}
                <button onClick={handleEvent} id="sidebarToggleTop" className="btn btn-link rounded-circle mx-3 d-flex justify-content-center align-items-center"> {/*d-md-none*/}
                    <FaBars></FaBars>
                </button>

                {/*// <!-- Topbar Navbar -->*/}
                <ul className="navbar-nav ms-auto">
                    {/*// <!-- Nav Item - User Information -->*/}
                    <li className="nav-item dropdown no-arrow">
                        <button className="nav-link dropdown-toggle" id="userDropdown" role="button"
                           data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                            <span className="mx-2 d-none d-lg-inline text-gray-600 small">{user ? user.name : "user"}</span>
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

            </nav>
        </>
)
}

export default Header;