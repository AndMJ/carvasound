import "./users.css"

import React, {useEffect, useState} from "react";
import {useOutletContext} from "react-router-dom";
import {FaDownload, FaPen, FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";

const Users = () => {
    useEffect(() => {
        document.title = "Carvasound - Users";
    },[])

    const {user} = useAuth()
    // const [allUsers] = useOutletContext();

    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Users</h1>
            </div>

            {/*// <!-- Content Row -->*/}
            <div className="row">

                {/*// <!-- Earnings (Monthly) Card Example -->*/}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">users</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        user list
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default Users;