import "./layout.css"

import {Navigate, Outlet} from "react-router-dom";
import Header from "../header/Header.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";

function Layout(){
    const {user} = useAuth()

    return(
        <>
            {user ?
                    <>
                        <div id="wrapper">
                            <Sidebar></Sidebar>

                            <div id="content-wrapper" className="d-flex flex-column">
                                <div id="content">
                                    <Header></Header>

                                    <div className="container-fluid">
                                        <Outlet ></Outlet>{/*context={[allUsers]}*/}
                                    </div>
                                </div>

                                <Footer></Footer>
                            </div>
                        </div>
                    </>
                :
                    <Navigate to={"/admin/login"}></Navigate>
            }
        </>
    )
}

export default Layout;