import "./layout.css"

import Header from "../header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../footer/Footer.jsx";

// import AOS from "aos";
// import 'aos/dist/aos.css';
// import {useEffect} from "react";

function Layout(){

    // useEffect(() => {
    //     AOS.init();
    // }, []);

    return(
        <>
            <Header></Header>

            <Outlet/>

            <Footer></Footer>
        </>
    )
}

export default Layout;