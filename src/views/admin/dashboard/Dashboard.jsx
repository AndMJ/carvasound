import "./dashboard.css"
import React, {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";
import {FaCalendar, FaClock, FaDownload, FaPen, FaTable, FaUser} from "react-icons/fa";


// import Clock from "../../../utils/Clock.jsx";
const Clock = React.lazy(()=> import("../../../utils/Clock.jsx"))
import Row from "react-bootstrap/Row";


function Dashboard(){

    const {user} = useAuth()

    useEffect(() => {
        document.title = "Carvasound - Dashboard";
    },[])

    return (
        <>
            {/*<div className="container-fluid px-4">
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
            </div>*/}



            {/*// <!-- Page Heading -->*/}
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                     <span className={"text-white"}><FaDownload></FaDownload> Generate Report</span>
                </a>
            </div>

            {/*// <!-- Content Row -->*/}
            <div className="row">

                {/*// <!-- Earnings (Monthly) Card Example -->*/}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">Today&apos;s date</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                        <Clock />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/*// <!-- Earnings (Monthly) Card Example -->*/}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-success shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                                        Earnings (Annual)</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*// <!-- Earnings (Monthly) Card Example -->*/}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-info text-uppercase mb-1">Tasks
                                    </div>
                                    <div className="row no-gutters align-items-center">
                                        <div className="col-auto">
                                            <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">50%</div>
                                        </div>
                                        <div className="col">
                                            <div className="progress progress-sm mr-2">
                                                <div className="progress-bar bg-info" role="progressbar"
                                                     style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0"
                                                     aria-valuemax="100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/*// <!-- Pending Requests Card Example -->*/}
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                        Pending Requests</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-comments fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Dashboard;