import {useContext, useState, createContext, useEffect} from "react";
import Loader from "../components/loader/Loader.jsx";
import {account} from "../appwrite/appwrite.config.jsx";
import {useNavigate} from "react-router-dom";


const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserOnLoad()
    },[])

    const getUserOnLoad = async () => {
        try {
            const userdata = await account.get()
            setUser(userdata)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    const handleLogin = async (event, credentials) => {
        event.preventDefault()

        try {
            const response = await account.createEmailSession(credentials.email, credentials.password)
            const userdata = await account.get()
            setUser(userdata)

            navigate("/admin")
        } catch (error) {
            console.error(error)
            return error
        }
    }

    const handleLogout = async (event, credentials) => {
        event.preventDefault()

        try {
            await account.deleteSession("current")
            setUser(null)

            // navigate("/admin/login")
        } catch (error) {
            console.error(error)
        }
    }

    const contextData = {
        user,
        handleLogin,
        handleLogout
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;