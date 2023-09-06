import {useContext, useState, createContext, useEffect} from "react";
import Loader from "../components/loader/Loader.jsx";

import {account, storage, database,
    STORAGE_BUCKET_ID,
    DATABASE_ID,
    COLLECTION_GALLERY_ID,
    COLLECTION_CATEGORY_ID,
} from "../appwrite/appwrite.config.jsx";

import {useNavigate} from "react-router-dom";


const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserOnLoad()
            .then(response => {
                setUser(response.user)
                setLoading(false)
            })
    },[])

    const getUserOnLoad = async () => { //TODO: handle all possible errors from API, like its done here, and make a way of showing errors popups, see @mui/material/Snackbar
        let promise = {}
        try {
            promise = { user: await account.get() }
        } catch (error) {
            promise = { error: error }
            console.log(error)
        }
        return promise
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

    const handleLogout = async (event) => {
        event.preventDefault()

        try {
            await account.deleteSession("current")
            setUser(null)

            // navigate("/admin/login")
        } catch (error) {
            console.error(error)
        }
    }

    /*
     * Database > Production
     * Collection > gallery
     */
    const addGalleryImage = async () => {

    }

    const getGalleryList = async () => {
        let promise = "";
        try {
            promise = database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID);

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    /*
     * Database > Production
     * Collection > category
     */
    const getCategoryList = async () => {
        let promise = "";
        try {
            promise = database.listDocuments(DATABASE_ID, COLLECTION_CATEGORY_ID);

        } catch (error) {
            console.error(error)
        }

        return promise
    }
    const getCategoryByID = async (category_id) => {
        let promise = "";
        try {
            promise = database.getDocument(DATABASE_ID, COLLECTION_CATEGORY_ID, category_id);

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    /*
     * Storage > Buckets > gallery_images
     */
    const getImagesByID = async (image_id) => {
        let promise = "";
        try {
            promise = await storage.getFileView(STORAGE_BUCKET_ID, image_id);

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    const contextData = {
        user,
        handleLogin,
        handleLogout,

        getImagesByID,
        getGalleryList,
        getCategoryByID,
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