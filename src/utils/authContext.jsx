import React, {createContext, useContext, useEffect, useState} from "react";
import {
    account,
    COLLECTION_CATEGORY_ID,
    COLLECTION_GALLERY_ID,
    database,
    DATABASE_ID,
    GenerateID,
    storage,
    STORAGE_BUCKET_ID,
} from "../appwrite/appwrite.config.jsx";

import {useNavigate} from "react-router-dom";
import {Query} from "appwrite";

const Loader = React.lazy(()=> import("../components/loader/Loader.jsx"))


const AuthContext = createContext()
export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserOnLoad()
            .then((response) => {
                if (response)
                setUser(response)
                setLoading(false)
            }, (error) => {
                console.log(error)
            })
    },[])

    const getUserOnLoad = async () => { //TODO: handle all possible errors from API, like its done here
        try {
            return await account.get()
        } catch (error) {
            //return error
            console.log(error)
        }
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
    const addGalleryImages = async (image_json) => {
        let promise
        try {
            promise = database.createDocument(DATABASE_ID, COLLECTION_GALLERY_ID, GenerateID, image_json);
        } catch (error) {
            console.error(error)
        }
        return promise
    }

    const getGalleryList = async () => {
        let promise = "";
        try {
            promise = database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.orderDesc('$createdAt'),
                ]
            );

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    const getGalleryByCategory = async (category_id) => {
        let promise = "";
        try {
            promise = database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.equal('category_id', category_id),
                ]
            );

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    const deleteGalleryByID = async (gallery_id) => {
        /*try {
            return await database.deleteDocument(DATABASE_ID, COLLECTION_GALLERY_ID, gallery_id)
        } catch (error) {
            console.error(error)
            return await error
        }*/


        try {
            const promise = database.deleteDocument(DATABASE_ID, COLLECTION_GALLERY_ID, gallery_id)
            return promise

        } catch (error) {
            console.error(error)
            return error
        }




        /*const promise = database.deleteDocument(DATABASE_ID, COLLECTION_GALLERY_ID, gallery_id)
        promise.then(function (response) {
            console.log(response); // Success
            return response
        }, function (error) {
            console.log(error); // Failure
            return error
        });*/

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
    const addStorageImage = async (image) => {
        let promise = "";
        try {
            promise = storage.createFile(STORAGE_BUCKET_ID, GenerateID, image);

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    const getStorageImagesByID = async (image_id) => {
        let promise = "";
        try {
            promise = await storage.getFileView(STORAGE_BUCKET_ID, image_id);

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    const deleteStorageImagesByID = async (image_id) => {
        let promise = "";
        try {
            promise = storage.deleteFile(STORAGE_BUCKET_ID, image_id);

        } catch (error) {
            console.error(error)
        }

        return promise
    }

    const contextData = {
        user,
        handleLogin,
        handleLogout,

        addGalleryImages,
        addStorageImage,

        getStorageImagesByID,
        getGalleryList,
        getGalleryByCategory,
        getCategoryList,
        getCategoryByID,

        deleteGalleryByID,
        deleteStorageImagesByID,
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