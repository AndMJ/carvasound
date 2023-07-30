import "./layout.css"

import {Navigate, Outlet} from "react-router-dom";
import Header from "../header/Header.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";

function Layout(){
    const {user} = useAuth()

    const allUsers = [
        {id: crypto.randomUUID(), name:"André João", email: "andre@email.com", password: "pw", permissions: "Admin"},
        {id: crypto.randomUUID(), name:"Anabel Iglesias", email: "anabel.iglesias@example.com", password: "pw", permissions: "permission 1"},
        {id: crypto.randomUUID(), name:"Jasper Værnes", email: "jasper.vaernes@example.com", password: "pw", permissions: "permission 1"},
        {id: crypto.randomUUID(), name:"Maren Syversen", email: "maren.syversen@example.com", password: "pw", permissions: "permission 1"},
        {id: crypto.randomUUID(), name:"Giulio Legrand", email: "giulio.legrand@example.com", password: "pw", permissions: "permission 1"},
        {id: crypto.randomUUID(), name:"Raúl Montero", email: "raul.montero@example.com", password: "pw", permissions: "permission 1"},
    ]

    return(
        <>
            {user ?
                    <>
                        <Header></Header>

                        <div id="layoutSidenav">

                            <Sidebar></Sidebar>

                            <div id="layoutSidenav_content">
                                <main>
                                    <Outlet context={[allUsers]}></Outlet>
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