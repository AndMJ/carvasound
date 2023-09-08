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
                          <UserApp></UserApp>
                          <AdminApp></AdminApp>
                      <Routes> {/* TODO: fix 404 page not found appearing will pages are loading */}
                          <Route path={"/*"} element={<PageNotFound />}></Route>
                      </Routes>
                  </AuthProvider>
              </AnimatePresence>
          </Suspense>
      </>
  )
}


export default App
