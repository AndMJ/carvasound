import {AnimatePresence} from "framer-motion";

import('./App.css')
import {Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from 'react'

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//my components/views
const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))

//USER
const Layout = React.lazy(()=> import("./components/user/layout/Layout.jsx"))
const Home = React.lazy(()=> import("./views/user/home/Home.jsx"))
const Events = React.lazy(()=> import("./views/user/events/Events.jsx"))
const Gallery = React.lazy(()=> import("./views/user/gallery/Gallery.jsx"))
const Contact = React.lazy(()=> import("./views/user/contact/Contact.jsx"))
const NotFound = React.lazy(()=> import("./views/user/not_found/NotFound.jsx"))

//ADMIN
const AdminLogin = React.lazy(()=> import("./views/admin/login/Login.jsx"))
const AdminLayout = React.lazy(()=> import("./components/admin/layout/Layout.jsx"))
const AdminDashboard = React.lazy(()=> import("./views/admin/dashboard/Dashboard.jsx"))
const AdminUsers = React.lazy(()=> import("./views/admin/users/Users.jsx"))
const AdminGallery = React.lazy(()=> import("./views/admin/gallery/Gallery.jsx"))


//TODO: - see about translations, and main language has to be Portuguese
//      - use React Motion Framer for animations, used some already
//          - fix motion animations on firefox
//      - fix footer @medias and styles
//      - make a "scrollTo" function so it goes to sayed category from the events page
//      - use icons
//      - center modal image on gallery page

function App() {

    //really simple authentication for testing
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser({name:"André João", email: "andre@email.com", password: "pw"})
    }, [])

  return (
      <>
          {/*<loader />*/}
          <Suspense fallback={<Loader />}>
              <AnimatePresence mode={"wait"}>
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

                      <Route path={"/admin/login"} element={<AdminLogin user={user} />}></Route>
                      <Route path={"/admin/"} element={<AdminLayout user={user} />}>
                          <Route index element={<AdminDashboard />} />
                          <Route path={"/admin/users"} element={<AdminUsers />}></Route>
                          <Route path={"/admin/gallery"} element={<AdminGallery />}></Route>
                          {/*<Route path={"/admin/gallery/upload"} element={<AdminGalleryUpload />}></Route>*/}
                          {/*<Route path={"/admin/gallery/delete"} element={<AdminGalleryDelete />}></Route>*/}
                          {/*<Route path={"*"} element={<NotFound />} />*/}
                      </Route>
                      <Route path={"*"} element={<NotFound />}></Route>
                  </Routes>
              </AnimatePresence>
          </Suspense>
      </>
  )
}


export default App
