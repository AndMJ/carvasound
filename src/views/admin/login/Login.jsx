import "./login.css"
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";

function Login () {
    const {user, handleLogin} = useAuth()

    const [credencials, setCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )
    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({...credencials, [name]:value})
    }

    return (
        <>
            {(user ? <Navigate to={"/admin"}/> :
                <div id="layoutAuthentication" className={"vh-100"}>
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-5">
                                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                                            <div className="card-header">
                                                <h3 className="text-center font-weight-light my-4">Login</h3>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={(event) => {handleLogin(event,credencials)}}>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputEmail" name="email" type="email" placeholder="name@example.com"
                                                               value={credencials.email} onChange={handleInputChange}/>
                                                        <label htmlFor="inputEmail">Email address</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control" id="inputPassword" name="password" type="password" placeholder="Password"
                                                               value={credencials.password} onChange={handleInputChange}/>
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                    {/*<div className="form-check mb-3">*/}
                                                    {/*    <input className="form-check-input" id="inputRememberPassword" type="checkbox" value=""/>*/}
                                                    {/*    <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>*/}
                                                    {/*</div>*/}
                                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                                        {/*<a className="small" href="password.html">Forgot Password?</a>*/}
                                                        <input className="btn btn-primary" type={"submit"} value={"Login"} />
                                                    </div>
                                                </form>
                                            </div>
                                            {/*<div className="card-footer text-center py-3">*/}
                                            {/*    <div className="small">*/}
                                            {/*        <a href="register.html">Need an account? Sign up!</a>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    {/*<div id="layoutAuthentication_footer">*/}
                    {/*    <footer className="py-4 bg-light mt-auto">*/}
                    {/*        <div className="container-fluid px-4">*/}
                    {/*            <div className="d-flex align-items-center justify-content-between small">*/}
                    {/*                <div className="text-muted">Copyright &copy; Your Website 2023</div>*/}
                    {/*                <div>*/}
                    {/*                    <a href="#">Privacy Policy</a> &middot; <a href="#">Terms &amp; Conditions</a>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </footer>*/}
                    {/*</div>*/}
                </div>
            )}
        </>
    )
}

export default Login;