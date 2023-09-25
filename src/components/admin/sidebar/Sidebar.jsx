import "./sidebar.css"
import {FaColumns, FaImage, FaTachometerAlt, FaUpload, FaUser} from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";

const Sidebar = () => {

    const location = useLocation();
    const [url, setUrl] = useState(null);

    useEffect(() => { //each time location changes, saves it in "url"
        setUrl(location.pathname);
    }, [location]);

    const {user} = useAuth()

    return (
        <>
            {/*<div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <Nav activeKey={url}>
                                <div className="sb-sidenav-menu-heading">Core</div>
                                <Nav.Link as={Link} to={"/admin"} eventKey={"/admin"}>
                                    <div className="sb-nav-link-icon"><FaColumns/></div>
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to={"/admin/users"} eventKey={"/admin/users"}>
                                    <div className="sb-nav-link-icon"><FaUser/></div>
                                    Users
                                </Nav.Link>
                                <div className="sb-sidenav-menu-heading">Imagens</div>
                                <Nav.Link as={Link} to={"/admin/gallery"} eventKey={"/admin/gallery"}>
                                    <div className="sb-nav-link-icon"><FaImage/></div>
                                    Gallery
                                </Nav.Link>
                            </Nav>
                        </div>
                    </div>
                    <div className="sb-sidenav-footer">
                        <div className="small">Logged in as:</div>
                        {user ? user.name : "user"}
                    </div>
                </nav>
            </div>*/}

            <Nav className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" activeKey={url}>

                {/*// <!-- Sidebar - Brand -->*/}
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-laugh-wink"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">Carvasound</div>
                </a>

                {/*// <!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*// <!-- Nav Item - Dashboard -->*/}
                <Nav.Item>
                    <Nav.Link as={Link} to={"/admin"} eventKey={"/admin"}>
                        <FaTachometerAlt></FaTachometerAlt>
                        <span>Dashboard</span>
                    </Nav.Link>
                </Nav.Item>

                {/*// <!-- Divider -->*/}
                <hr className="sidebar-divider"/>

                {/*// <!-- Heading -->*/}
                <div className="sidebar-heading">
                    Images
                </div>

                {/*// <!-- Nav Item - Pages Collapse Menu -->*/}
                <Nav.Item>
                    <Nav.Link as={Link} to={"/admin/gallery"} eventKey={"/admin/gallery"}>
                        <FaImage/>
                        <span>Gallery</span>
                    </Nav.Link>
                </Nav.Item>

                {/*// <!-- Divider -->*/}
                <hr className="sidebar-divider d-none d-md-block"/>

                {/*// <!-- Sidebar Toggler (Sidebar) -->*/}
                <div className="text-center d-none d-md-inline">
                    <button className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

            </Nav>
        </>
    )
}

export default Sidebar;