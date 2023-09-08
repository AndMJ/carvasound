import {AnimatePresence} from "framer-motion";

import {Route, Routes} from "react-router-dom";
import React, {Suspense} from 'react'

//Authentication + DB queries
import {AuthProvider} from "./utils/authContext.jsx";

//components/views
const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))
const PageNotFound = React.lazy(()=> import("./views/not_found/NotFound.jsx"))

//USER
const Layout = React.lazy(()=> import("./components/user/layout/Layout.jsx"))
// const Home = React.lazy(()=> import("./views/user/home/Home.jsx"))
// const Events = React.lazy(()=> import("./views/user/events/Events.jsx"))
// const Gallery = React.lazy(()=> import("./views/user/gallery/Gallery.jsx"))
// const Contact = React.lazy(()=> import("./views/user/contact/Contact.jsx"))
const LandingPage = React.lazy(()=> import("./views/user/landing/LandingPage.jsx"))

//ADMIN
const AdminLayout = React.lazy(()=> import("./components/admin/layout/Layout.jsx"))
const AdminLogin = React.lazy(()=> import("./views/admin/login/Login.jsx"))
const AdminDashboard = React.lazy(()=> import("./views/admin/dashboard/Dashboard.jsx"))
const AdminUsers = React.lazy(()=> import("./views/admin/users/Users.jsx"))
const AdminGallery = React.lazy(()=> import("./views/admin/gallery/Gallery.jsx"))


/*
TODO:
    - FIX RENDER.COM IMPORT CHUNKS BIGGER THAN 500Mb, separate admin imports from user, diff files
    [GENERAL/USER]
    - see about translations, and main language has to be Portuguese, see https://react.i18next.com/
    - see React Motion Framer for animations
    [ADMIN]
    - use Material UI DataGrid table for all tables, see https://mui.com/x/react-data-grid/editing/
        - save, edit and delete confirmations, see https://mui.com/x/react-data-grid/editing/#confirm-before-saving
        - use Snackbar from '@mui/material/Snackbar' for action confirmation
    - login error message
        - maybe use Snackbar from '@mui/material/Snackbar' for action confirmation/error?
    - add proper loader to AuthContext
*/
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
                                      {/*<Home />*/}
                                      <LandingPage></LandingPage>
                                  </Suspense>
                              } />
                              {/*<Route path={"events"} element={
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
                              } />*/}
                              {/*<Route path={"*"} element={<UserPageNotFound />}></Route>*/}
                          </Route>

                          {/*ADMIN PUBLIC ROUTE*/}
                          <Route path={"/admin/login"} element={<AdminLogin/>}></Route>

                          {/*ADMIN PRIVATE ROUTES*/}
                          <Route path={"/admin/"} element={<AdminLayout/>}>
                              <Route index element={
                                  <Suspense fallback={<Loader />}>
                                      <AdminDashboard />
                                  </Suspense>
                              } />
                              <Route path={"/admin/users"} element={
                                  <Suspense fallback={<Loader />}>
                                      <AdminUsers />
                                  </Suspense>
                              }></Route>
                              <Route path={"/admin/gallery"} element={
                                  <Suspense fallback={<Loader />}>
                                      <AdminGallery />
                                  </Suspense>
                              }></Route>
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
