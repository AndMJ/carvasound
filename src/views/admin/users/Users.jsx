import "./users.css"

import {useState} from "react";
import {useOutletContext} from "react-router-dom";
import {FaPen, FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";

const Users = () => {

    const {user} = useAuth()
    // const [allUsers] = useOutletContext();

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4">Users</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Users</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <FaTable className={"me-1"}></FaTable> Tabela Users
                    </div>
                    <div className="card-body">

                    </div>
                </div>

            </div>
        </>
    )
}

export default Users;