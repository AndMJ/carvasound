import Header from "../header/Header.jsx";
import {Outlet} from "react-router-dom";
import Footer from "../footer/Footer.jsx";
import {useRef, useState} from "react";
import { motion } from "framer-motion"

function Layout(){

    const [activeSection, setActiveSection] = useState(null);
    const sectionRefs = {
        main: useRef(null),
        about: useRef(null),
        services: useRef(null),
        gallery: useRef(null),
        contact: useRef(null)
    };

    return(
        <>
            <motion.div
                className={"landing-page-effect"}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0 }}
            >
                <Header activeSection={activeSection}></Header>

                <Outlet context={[activeSection, setActiveSection, sectionRefs]}></Outlet>

                <Footer></Footer>
            </motion.div>
        </>
    )
}




export default Layout;