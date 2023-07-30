import "./users.css"
import {FaPen, FaTable} from "react-icons/fa";
import {useOutletContext} from "react-router-dom";
import {FaX} from "react-icons/fa6";
import {useAuth} from "../../../utils/authContext.jsx";

const Users = () => {

    const {user} = useAuth()

    const [allUsers] = useOutletContext();

    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4">Users</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Users</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <FaTable className={"me-1"}></FaTable>
                        Table users
                    </div>
                    <div className="card-body">
                        <table id="datatablesSimple">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Permissions</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
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
                            {/*                    <td><a href={"#"}><FaPen></FaPen></a></td>*/}
                            {/*                    <td><a href={"#"}><FaX></FaX></a></td>*/}
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
        </>
    )
}

export default Users;