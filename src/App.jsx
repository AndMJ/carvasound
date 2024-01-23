import {AnimatePresence} from "framer-motion";

import {Route, Routes} from "react-router-dom";
import React, {Suspense} from 'react'

//Authentication + DB queries
import {AuthProvider} from "./utils/authContext.jsx";
import {createTheme, ThemeProvider} from "@mui/material";

//components/views
const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))
const PageNotFound = React.lazy(()=> import("./views/not_found/NotFound.jsx"))

//USER
const UserApp = React.lazy(()=> import("./userApp.jsx"))

//ADMIN
const AdminApp = React.lazy(()=> import("./adminApp.jsx"))


/*
TODO: [GENERAL]
 - FIX RENDER.COM IMPORT CHUNKS BIGGER THAN 500Mb, separate admin imports from user, diff files
 - see about translations, and main language has to be Portuguese, see https://react.i18next.com/
 - see React Motion Framer for animations
 - appwrite network errors, sometimes it works, some it doesnt ???
 - when all finished, comment all .logs and debug code
*/

/*
TODO: [USER]
 -
*/

/*
TODO: [ADMIN]
 - navbar toggle button not working
 - make a way to save user preferences like theme, login remember password
*/

function App() {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const theme = createTheme({
        components: {
            MuiChip: {
                styleOverrides: {
                    root: {
                        fontSize: "0.9rem"
                    }
                }
            },
        },
        typography: {
            fontFamily: '"Nunito", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", !default',
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 768,
                md: 576,
                lg: 992,
                xl: 1200,
            },
        },
    });

  return (
      <>
          <ThemeProvider theme={theme}>
              <AnimatePresence mode={"wait"}>
                  <AuthProvider>
                      <Routes>
                          <Route path={"/*"} element={<UserApp></UserApp>}></Route>
                          <Route path={"/admin/*"} element={<AdminApp></AdminApp>}></Route>
                      </Routes>
                  </AuthProvider>
              </AnimatePresence>
          </ThemeProvider>

      </>
  )
}


export default App
