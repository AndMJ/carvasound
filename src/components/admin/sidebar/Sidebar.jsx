import "./sidebar.css"
import {FaImage} from "react-icons/fa";
import {Nav} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
//import {useAuth} from "../../../utils/authContext.jsx";

import appLogo from "/logoWhite.png"

const Sidebar = () => {

    const location = useLocation();
    const [url, setUrl] = useState(null);

    useEffect(() => { //each time location changes, saves it in "url"
        setUrl(location.pathname);
        //console.log(location.pathname)
    }, [location]);

    //const {user} = useAuth()

    /*const handleEvent = (e) => {
        e.preventDefault();
        //document.body.classList.toggle('sidebar-toggled');
        document.getElementsByClassName("sidebar")[0].classList.toggle('toggled');
    }*/

    /*const [toggleClass, setToggleClass] = useState(false)
    useEffect(() => {
        const handleResize = () => {
            // Adjust the condition based on your needs
            setToggleClass(window.innerWidth <= 768); //md
        };

        // Attach the event listener
        window.addEventListener('resize', handleResize);

        // Call it once to set the initial state
        handleResize();

        // Detach the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);*/

    return (
        <>
            <Nav className={"navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"} id="accordionSidebar" as="ul" activeKey={url}> {/*+ (toggleClass ? "toggled" : "")*/}

                {/*// <!-- Sidebar - Brand -->*/}
                <div className="sidebar-brand d-flex align-items-center justify-content-center">
                    <div className="sidebar-brand-icon">
                        <img src={appLogo} width={40} alt={"Carvasound Logo"}/>
                    </div>
                    <div className="sidebar-brand-text mx-3">Carvasound</div>
                </div>

                {/*<Nav.Link as={Link} to={"/admin"} eventKey={"/admin"} className={"sidebar-brand d-flex align-items-center justify-content-center"}>
                    <div className="sidebar-brand-icon">
                        <img src={appLogo} width={40}/>
                    </div>
                    <div className="sidebar-brand-text mx-3">Carvasound</div>
                </Nav.Link>*/}

                {/*// <!-- Divider -->*/}
                <hr className="sidebar-divider my-0"/>

                {/*// <!-- Nav Item - Dashboard -->*/}
                {/*<Nav.Item as="li">
                    <Nav.Link as={Link} to={"/admin"} eventKey={"/admin"}>
                        <FaTachometerAlt className={"icon"}></FaTachometerAlt> <span>Dashboard</span>
                    </Nav.Link>
                </Nav.Item>*/}

                {/*// <!-- Divider -->*/}
                {/*<hr className="sidebar-divider"/>*/}

                {/*// <!-- Heading -->*/}
                {/*<div className="sidebar-heading">
                    Images
                </div>*/}

                {/*// <!-- Nav Item - Pages Collapse Menu -->*/}
                <Nav.Item as="li">
                    <Nav.Link as={Link} to={"/admin"} eventKey={"/admin"}> {/*to={"/admin/gallery"} eventKey={"/admin/gallery"}*/}
                        <FaImage className={"icon"}></FaImage> <span>Gallery</span>
                    </Nav.Link>
                    {/*<Nav.Link as={Link} to={"/admin/category"} eventKey={"/admin/category"}>
                        <FaList className={"icon"}></FaList> <span>Category page ?</span>
                    </Nav.Link>*/}
                </Nav.Item>

                {/*// <!-- Divider -->*/}
                {/*<hr className="sidebar-divider d-none d-md-block"/>*/}

                {/*// <!-- Sidebar Toggler (Sidebar) -->*/}
                {/*<div className="text-center d-none d-md-inline">
                    <button onClick={handleEvent} className="rounded-circle border-0" id="sidebarToggle"></button>
                </div>*/}

            </Nav>
        </>
    )
}

export default Sidebar;