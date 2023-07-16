import "./header.css"

import {FaBars} from "react-icons/fa";

const Header = () => {

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
                        <a className="nav-link" href="#">Logout</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Header;