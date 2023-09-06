import "./sidebar.css"
import {FaColumns, FaImage, FaUpload, FaUser} from "react-icons/fa";
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
            <div id="layoutSidenav_nav">
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
                        {/*<div className="small">{props.user.email}</div>*/}
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Sidebar;