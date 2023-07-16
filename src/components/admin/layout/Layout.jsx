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

    return(
        <>
            {Auth ?
                    <>
                        <Header></Header>

                        <div id="layoutSidenav">

                            <Sidebar user={user ? user : null}></Sidebar>

                            <div id="layoutSidenav_content">
                                <main>
                                    <Outlet context={user ? user : null}></Outlet>
                                </main>
                                <Footer></Footer>
                            </div>
                        </div>
                    </>
                    : <Navigate to={"/admin/login"}></Navigate>
            }
        </>
    )
}

export default Layout;