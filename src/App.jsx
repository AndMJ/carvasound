import('./App.css')
import {Route, Routes} from "react-router-dom";
import React, {Suspense} from 'react'

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';

//my components/views
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



//TODO: implement React.Suspense properly - https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52/
//      AOS animations not working properly
//      restructure routes?, not sure

function App() {

  return (
      <>
      <Suspense fallback={<div>Loading...</div>}>
          <Routes>
              <Route path={"/"} element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path={"events"} element={<Events />}></Route>
                  <Route path={"gallery"} element={<Gallery />}></Route>
                  <Route path={"contact"} element={<Contact />}></Route>
              </Route>

              <Route path={"/admin/login"} element={<AdminLogin />}></Route>
              <Route path={"/admin/"} element={<AdminLayout />}>
                  <Route index element={<AdminHome />} />
                  {/*<Route path={"*"} element={<NotFound />} />*/}
              </Route>
              <Route path={"*"} element={<NotFound />}></Route>
          </Routes>
          {/*<Routes>*/}
          {/*    <Route to={"/"} element={<User/>}></Route>*/}
          {/*    <Route to={"/admin"} element={<Admin/>}></Route>*/}
          {/*</Routes>*/}
      </Suspense>
      </>
  )
}


export default App
