import {AnimatePresence} from "framer-motion";

import('./App.css')
import {Route, Routes, useLocation} from "react-router-dom";
import React, {Suspense, useEffect, useState} from 'react'

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import {AuthProvider} from "./utils/authContext.jsx";

//my components/views
const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))
const PageNotFound = React.lazy(()=> import("./views/not_found/NotFound.jsx"))

//USER
const Layout = React.lazy(()=> import("./components/user/layout/Layout.jsx"))
const Home = React.lazy(()=> import("./views/user/home/Home.jsx"))
const Events = React.lazy(()=> import("./views/user/events/Events.jsx"))
const Gallery = React.lazy(()=> import("./views/user/gallery/Gallery.jsx"))
const Contact = React.lazy(()=> import("./views/user/contact/Contact.jsx"))

//ADMIN
const AdminLogin = React.lazy(()=> import("./views/admin/login/Login.jsx"))
const AdminLayout = React.lazy(()=> import("./components/admin/layout/Layout.jsx"))
const AdminDashboard = React.lazy(()=> import("./views/admin/dashboard/Dashboard.jsx"))
const AdminUsers = React.lazy(()=> import("./views/admin/users/Users.jsx"))
const AdminGallery = React.lazy(()=> import("./views/admin/gallery/Gallery.jsx"))


//TODO:
// GENERAL/USER
//  - use favicon.ico
//  - see about translations, and main language has to be Portuguese
//  - use React Motion Framer for animations, used some already
//      - fix motion animations on firefox
//  - fix USER footer @medias and styles
//  - make a "scrollTo" function so it goes to sayed category from the events page
//  - use icons
//  - center modal image on gallery page
// ADMIN
//  - use Material UI DataGrid table for all tables, see https://mui.com/x/react-data-grid/editing/
//  - use Modals for user action verification
//  - login error message

function App() {

  return (
      <>
          {/*<loader />*/}
          <Suspense fallback={<Loader />}>
              <AnimatePresence mode={"wait"}>
                  <AuthProvider>
                      <Routes>
                          {/*USER PUBLIC ROUTES*/}
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
                              {/*<Route path={"*"} element={<UserPageNotFound />}></Route>*/}
                          </Route>

                          {/*ADMIN PUBLIC ROUTE*/}
                          <Route path={"/admin/login"} element={<AdminLogin/>}></Route>

                          {/*ADMIN PRIVATE ROUTES*/}
                          <Route path={"/admin/"} element={<AdminLayout/>}>
                              <Route index element={<AdminDashboard />} />
                              <Route path={"/admin/users"} element={<AdminUsers />}></Route>
                              <Route path={"/admin/gallery"} element={<AdminGallery />}></Route>
                              {/*<Route path={"/admin/gallery/upload"} element={<AdminGalleryUpload />}></Route>*/}
                              {/*<Route path={"/admin/gallery/delete"} element={<AdminGalleryDelete />}></Route>*/}
                              {/*<Route path={"*"} element={<AdminPageNotFound />}></Route>*/}
                          </Route>
                          <Route path={"*"} element={<PageNotFound />}></Route>
                      </Routes>
                  </AuthProvider>
              </AnimatePresence>
          </Suspense>
      </>
  )
}


export default App
