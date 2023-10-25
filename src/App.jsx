import {AnimatePresence} from "framer-motion";

import {Route, Routes} from "react-router-dom";
import React, {Suspense} from 'react'

//Authentication + DB queries
import {AuthProvider} from "./utils/authContext.jsx";

//components/views
const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))
const PageNotFound = React.lazy(()=> import("./views/not_found/NotFound.jsx"))

//USER
const UserApp = React.lazy(()=> import("./userApp.jsx"))

//ADMIN
const AdminApp = React.lazy(()=> import("./adminApp.jsx"))

/*
TODO:
    - FIX RENDER.COM IMPORT CHUNKS BIGGER THAN 500Mb, separate admin imports from user, diff files
    [GENERAL/USER]
    - see about translations, and main language has to be Portuguese, see https://react.i18next.com/
    - see React Motion Framer for animations
    [ADMIN]
    - login error message
*/
function App() {

  return (
      <>
          <AnimatePresence mode={"wait"}>
              <AuthProvider>
                  <Suspense fallback={<Loader />}>
                      <Routes>
                          <Route path={"/*"} element={<UserApp></UserApp>}></Route>
                          <Route path={"/admin/*"} element={<AdminApp></AdminApp>}></Route>
                      </Routes>
                  </Suspense>
              </AuthProvider>
          </AnimatePresence>

      </>
  )
}


export default App
