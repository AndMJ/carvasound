import "./dashboard.css"
import {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";

import {FaClock, FaPen, FaTable, FaUser} from "react-icons/fa";
import {useOutletContext} from "react-router-dom";
import {FaX} from "react-icons/fa6";

import Clock from "../../../utils/Clock.jsx";
import {Row} from "react-bootstrap";


function Dashboard(){

    const {user} = useAuth()

    const [allUsers] = useOutletContext();

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                {/*<div className="row">*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-primary text-white mb-4">*/}
                {/*            <div className="card-body">Primary Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-warning text-white mb-4">*/}
                {/*            <div className="card-body">Warning Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-success text-white mb-4">*/}
                {/*            <div className="card-body">Success Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-danger text-white mb-4">*/}
                {/*            <div className="card-body">Danger Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Row>
                    <div className={"col-xl-3 col-md-6"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaUser className={"me-1"}></FaUser> Bem vindo
                            </div>
                            <div className="card-body">
                                 {user ? user.name: "user"}
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
                                <table id="datatablesSimple">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Permissions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {/*{allUsers ?*/}
                                    {/*    allUsers.map(userdata => {*/}
                                    {/*        return (*/}
                                    {/*            <>*/}
                                    {/*                <tr key={userdata.id}>*/}
                                    {/*                    <td>{userdata.id}</td>*/}
                                    {/*                    <td>{userdata.name}</td>*/}
                                    {/*                    <td>{userdata.email}</td>*/}
                                    {/*                    <td>{userdata.permissions}</td>*/}
                                    {/*                </tr>*/}
                                    {/*            </>*/}
                                    {/*        )*/}
                                    {/*    })*/}

                                    {/*    :*/}

                                    {/*    <tr>no data found</tr>*/}
                                    {/*}*/}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default Dashboard;