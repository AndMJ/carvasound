import "./layout.css"

import {Navigate, Outlet} from "react-router-dom";
import Header from "../header/Header.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import {useEffect, useState} from "react";

function Layout(props){
    const user = props.user;

    const [Auth, setAuth] = useState(() => {
        if(!user){
            return false;
        }

        if (user.password === "pw"){
            return true;
        }

        return false;
    });

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
            {Auth ?
                    <>
                        <Header></Header>

                        <div id="layoutSidenav">

                            <Sidebar user={user ? user : null}></Sidebar>

                            <div id="layoutSidenav_content">
                                <main>
                                    <Outlet context={[(user ? user : null), allUsers]}></Outlet>
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