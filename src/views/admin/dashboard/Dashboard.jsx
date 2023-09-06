import "./dashboard.css"
import React, {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";
import {FaClock, FaPen, FaTable, FaUser} from "react-icons/fa";


// import Clock from "../../../utils/Clock.jsx";
const Clock = React.lazy(()=> import("../../../utils/Clock.jsx"))
import Row from "react-bootstrap/Row";


function Dashboard(){

    const {user} = useAuth()

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>

                <Row>
                    <div className={"col-xl-3 col-md-6"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaUser className={"me-1"}></FaUser> Welcome
                            </div>
                            <div className="card-body">
                                <p>user: <span>{user ? user.name : "user"}</span></p>
                                <p>email: <span>{user ? user.email : "email"}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className={"col-xl-3 col-md-6"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaClock className={"me-1"}></FaClock> Today&apos;s date
                            </div>
                            <div className="card-body">
                                <Clock />
                            </div>
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className={"col"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaTable className={"me-1"}></FaTable> Table users
                            </div>
                            <div className="card-body">

                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default Dashboard;