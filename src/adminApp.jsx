import {Route, Routes} from "react-router-dom";
import React, {Suspense} from 'react'
//import custom css + bootstrap js
import "./assets/css/admin/sb-admin-2.scss"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Loader = React.lazy(()=> import("./components/loader/Loader.jsx"))
const PageNotFound = React.lazy(()=> import("./views/not_found/NotFound.jsx"))
//ADMIN
const AdminLayout = React.lazy(()=> import("./components/admin/layout/Layout.jsx"))
//const AdminDashboard = React.lazy(()=> import("./views/admin/dashboard/Dashboard.jsx"))
//const AdminUsers = React.lazy(()=> import("./views/admin/users/Users.jsx"))
const AdminGallery = React.lazy(()=> import("./views/admin/gallery/Gallery.jsx"))
//const AdminCategory = React.lazy(()=> import("./views/admin/category/Category.jsx"))
const AdminLogin = React.lazy(()=> import("./views/admin/login/Login.jsx"))

const AdminApp = () => (
    <Routes>
        {/*ADMIN PUBLIC ROUTE*/}
        <Route path={"/login"} element={<AdminLogin/>}></Route>

        {/*ADMIN PRIVATE ROUTES*/}
        <Route element={<AdminLayout/>}> {/*path={"/admin/"}*/}
            {/*<Route index element={
                <Suspense fallback={<Loader />}>
                    <AdminDashboard />
                </Suspense>
            } />*/}
            {/*<Route path={"/users"} element={
                <Suspense fallback={<Loader />}>
                    <AdminUsers />
                </Suspense>
            }></Route>*/}
            {/*path={"/gallery"}*/}<Route index element={
                <Suspense fallback={<Loader />}>
                    <AdminGallery />
                </Suspense>
            }></Route>
            {/*<Route path={"/category"} element={*/}
            {/*    <Suspense fallback={<Loader />}>*/}
            {/*        <AdminCategory />*/}
            {/*    </Suspense>*/}
            {/*}></Route>*/}
        </Route>
        <Route path={"/*"} element={<PageNotFound />}></Route>
    </Routes>
)

export default AdminApp;