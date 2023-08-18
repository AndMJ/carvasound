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
                        <Header></Header>

                        <div id="layoutSidenav">

                            <Sidebar></Sidebar>

                            <div id="layoutSidenav_content">
                                <main>
                                    <Outlet ></Outlet>{/*context={[allUsers]}*/}
                                </main>
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