import('./App.css')
import {Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from 'react'

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//my components/views
// import loader from "./components/user/loader/loader.jsx";
const Loader = React.lazy(()=> import("./components/user/loader/Loader.jsx"))
//USER
// import Layout from "./components/user/layout/Layout.jsx";
// import Home from "./views/user/home/Home.jsx";
// import Events from "./views/user/events/Events.jsx";
// import Gallery from "./views/user/gallery/Gallery.jsx";
// import Contact from "./views/user/contact/Contact.jsx";
// import NotFound from "./views/user/not_found/NotFound.jsx";

const Layout = React.lazy(()=> import("./components/user/layout/Layout.jsx"))
const Home = React.lazy(()=> import("./views/user/home/Home.jsx"))
const Events = React.lazy(()=> import("./views/user/events/Events.jsx"))
const Gallery = React.lazy(()=> import("./views/user/gallery/Gallery.jsx"))
const Contact = React.lazy(()=> import("./views/user/contact/Contact.jsx"))
const NotFound = React.lazy(()=> import("./views/user/not_found/NotFound.jsx"))

//ADMIN
// import AdminLayout from "./components/admin/layout/Layout.jsx";
// import AdminHome from "./views/admin/home/Home.jsx";
// import AdminLogin from "./views/admin/login/Login.jsx";

const AdminLayout = React.lazy(()=> import("./components/admin/layout/Layout.jsx"))
const AdminHome = React.lazy(()=> import("./views/admin/home/Home.jsx"))
const AdminLogin = React.lazy(()=> import("./views/admin/login/Login.jsx"))



//TODO: - see about translations, and main language has to be Portuguese
//      - use React Motion Framer for animations
//      - add a title to each page ex: "Eventos", "Galeria"
//      - fix footer @medias and styles
//      - make a "scrollTo" function so it goes to sayed category from the events page
//      - use icons
//      - center modal image on gallery page
//      - fix font-family not working on chrome browser

function App() {

    // const location = useLocation();
    // const [url, setUrl] = useState(null);
    //
    // useEffect(() => { //each time location changes, saves it in "url"
    //     setUrl(location.pathname);
    // }, [location]);

  return (
      <>
          {/*<loader />*/}
          <Suspense fallback={<Loader />}>
              <Routes>
                  <Route exact path={"/"} element={<Layout />}>
                      <Route index element={
                          <Suspense fallback={<Loader />}>
                              <Home />
                          </Suspense>
                      } />
                      <Route path={"events"} element={
                          <Suspense fallback={<Loader />}>
                              <Events />
                          </Suspense>
                      } />
                      <Route path={"gallery"} element={
                          <Suspense fallback={<Loader />}>
                              <Gallery />
                          </Suspense>
                      } />
                      <Route path={"contact"} element={
                          <Suspense fallback={<Loader />}>
                              <Contact />
                          </Suspense>
                      } />
                  </Route>

                  <Route path={"/admin/login"} element={<AdminLogin />}></Route>
                  <Route path={"/admin/"} element={<AdminLayout />}>
                      <Route index element={<AdminHome />} />
                      {/*<Route path={"*"} element={<NotFound />} />*/}
                  </Route>
                  <Route path={"*"} element={<NotFound />}></Route>
              </Routes>
          </Suspense>
      </>
  )
}


export default App
