import {Route, Routes} from "react-router-dom";
import React, {Suspense} from 'react'

const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))
const PageNotFound = React.lazy(()=> import("./views/not_found/NotFound.jsx"))
//USER
const Layout = React.lazy(()=> import("./components/user/layout/Layout.jsx"))
// const Home = React.lazy(()=> import("./views/user/home/Home.jsx"))
// const Events = React.lazy(()=> import("./views/user/events/Events.jsx"))
// const Gallery = React.lazy(()=> import("./views/user/gallery/Gallery.jsx"))
// const Contact = React.lazy(()=> import("./views/user/contact/Contact.jsx"))
const LandingPage = React.lazy(()=> import("./views/user/landing/LandingPage.jsx"))

//import custom css + bootstrap
import "./assets/css/styles.scss"
//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const UserApp = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={
                <Suspense fallback={<Loader />}>
                    <LandingPage></LandingPage>
                </Suspense>
            } />
        </Route>
        <Route path={"*"} element={<PageNotFound />}></Route>
    </Routes>
)

export default UserApp;