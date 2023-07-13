import "./layout.css"

import Header from "../header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../footer/Footer.jsx";


function Layout(){
    return(
        <>
            <Header></Header>

            <Outlet/>

            <Footer></Footer>
        </>
    )
}

export default Layout;