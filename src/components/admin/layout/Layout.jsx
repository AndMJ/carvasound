import "./layout.css"

import {Navigate, Outlet} from "react-router-dom";
import Header from "../header/Header.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import Footer from "../Footer/Footer.jsx";
import {useAuth} from "../../../utils/authContext.jsx";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Layout(){
    const {user} = useAuth()

    const newToastNotif = (type,message) => {
        if (type === "success") {
            toast.success(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        if (type === "error") {
            toast.error(message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

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
                                        <ToastContainer containerId={"appNotifications-container"} className="position-fixed end-0 me-4"></ToastContainer>
                                        <Outlet context={[newToastNotif]} ></Outlet>
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