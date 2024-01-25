import "./login.css"
import {Navigate, useNavigate} from "react-router-dom";
import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";
import { motion } from "framer-motion"

import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import {CircularProgress} from "@mui/material";

function Login () {
    useEffect(() => {
        document.title = "Carvasound - Login";
    },[])

    const {user, handleLogin} = useAuth()
    const [isLoading, setIsLoading] = useState(false);

    const [credencials, setCredentials] = useState(
        {
            email: "",
            password: ""
        }
    )
    const handleInputChange = (e) => {
        let inputname = e.target.name
        let inputvalue = e.target.value

        setCredentials({...credencials, [inputname]:inputvalue})
    }

    const handleLoginErrors = async (event) => {
        event.preventDefault()

        setIsLoading(true)

        let response = await handleLogin(event, credencials)
        //console.error(response)

        if (response !== undefined){ //has an error
            toast.error(response.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        setIsLoading(false)
    }

    return (
        <>
            {(user ? <Navigate to={"/admin"}/> :
                <div id="layoutAuthentication" className={"bg-gradient-primary vh-100"}>
                    <div id="layoutAuthentication_content">
                        <main>
                            <div className="container">

                                <ToastContainer containerId={"appNotifications-container"} className="position-fixed end-0 mb-4 me-4 z-3"></ToastContainer>

                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-8 col-xl-6">
                                        <motion.div className="card shadow-lg border-0 rounded-lg mt-5"
                                                    initial={{ opacity: 0}}
                                                    animate={{ opacity: 1}}
                                                    transition={{ delay: 0.3 }}
                                        >
                                            <div className="card-header">
                                                <h3 className="text-center font-weight-light my-4 text-black">Carvasound Login</h3>
                                            </div>
                                            <div className="card-body">
                                                <form onSubmit={(event) => {handleLoginErrors(event)}}>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control text-black" id="inputEmail" name="email" type="email" placeholder="name@example.com"
                                                               value={credencials.email} onChange={handleInputChange} disabled={isLoading}/>
                                                        <label htmlFor="inputEmail">Email address</label>
                                                    </div>
                                                    <div className="form-floating mb-3">
                                                        <input className="form-control text-black" id="inputPassword" name="password" type="password" placeholder="Password"
                                                               value={credencials.password} onChange={handleInputChange} disabled={isLoading}/>
                                                        <label htmlFor="inputPassword">Password</label>
                                                    </div>
                                                    {/*<div className="form-check mb-3">*/}
                                                    {/*    <input className="form-check-input" id="inputRememberPassword" type="checkbox" value=""/>*/}
                                                    {/*    <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>*/}
                                                    {/*</div>*/}
                                                    <div className="d-flex align-items-center justify-content-start mt-4 mb-0">
                                                        {/*<a className="small" href="password.html">Forgot Password?</a>*/}
                                                        <button type={"submit"} className="btn btn-primary text-white" disabled={isLoading}>
                                                            <span className={"text"}>Login</span>
                                                        </button>
                                                        {isLoading && <CircularProgress size={24} color="primary" />}
                                                    </div>
                                                </form>
                                            </div>
                                            {/*<div className="card-footer text-center py-3">*/}
                                            {/*    <div className="small">*/}
                                            {/*        <a href="register.html">Need an account? Sign up!</a>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                    <div id="layoutAuthentication_footer">
                        <footer className="py-4 bg-transparent mt-auto">
                            <div className="container-fluid px-4">
                                <div className="d-flex align-items-center justify-content-between small">
                                    <div className="text-muted">Copyright &copy; Carvasound {new Date().getFullYear()}</div>
                                    <div className="text-muted">
                                        Made by <a className={"text-white"} href="https://github.com/AndMJ" target={"_blank"} rel="noreferrer noopener">AndMJ</a>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </>
    )
}

export default Login;