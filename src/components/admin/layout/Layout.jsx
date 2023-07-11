import "./layout.css"

// import Header from "../header/Header.jsx";
import {Navigate, Outlet} from "react-router-dom";
// import Footer from "../footer/Footer.jsx";

function Layout(){

    //simple user login condition for testing
    const user = true

    return(
        <>
            {/*<Header></Header>*/}

            {(user === true ? <Outlet></Outlet> : <Navigate to={"/admin/login"}></Navigate>)}

            {/*<Footer></Footer>*/}
        </>
    )
}

export default Layout;