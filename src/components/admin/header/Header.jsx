import "./header.css"

import {FaBars} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";

const Header = () => {
    const {user, handleLogout} = useAuth()
    const handleEvent = (e) => {
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    return (
        <>
            <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">

                {/*// <!-- Navbar Brand-->*/}
                <a className="navbar-brand ps-3" href="index.html">Carvasound</a>

                {/*// <!-- Sidebar Toggle-->*/}
                <button className="btn btn-link btn-sm me-4 me-lg-0 order-1 order-lg-0" id="sidebarToggle" onClick={handleEvent} >
                    <FaBars></FaBars>
                </button>

                {/*// <!-- Navbar--> */}
                <ul className="navbar-nav ms-auto  me-3 me-lg-4 md-go-to-end">
                    <li className="nav-item">
                        <button className="nav-link" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;