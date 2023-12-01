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

const AuthContext = createContext(null)
export const AuthProvider = ({children}) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserOnLoad() //TODO: session cookies giving an error
            /*.then((response) => {
                if (response) {
                    setUser(response)
                    setLoading(false)
                }
            }, (error) => {
                console.log(error)
            })*/
        //setLoading(false)
    },[])

    const getUserOnLoad = async () => { //TODO: handle all possible errors from API, like its done here
        try {
            const userdata = await account.get()
            setUser(userdata)
        } catch (error) {
            console.error(error)
            //await account.deleteSession("current")
            //return error
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
        try {
            return database.createDocument(DATABASE_ID, COLLECTION_GALLERY_ID, GenerateID, image_json);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getGalleryList = async () => {
        try {
            return database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.limit(100),
                    Query.orderDesc('$createdAt'),
                ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getGalleryListNoNull = async () => {
        try {
            return database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.limit(100),
                    Query.isNotNull("category"),
                    Query.orderDesc('$createdAt'),
                ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getGalleryListNextPage = async (last_item_id) => {
        try {
            return database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.limit(100),
                    Query.isNotNull("category"),
                    Query.orderDesc('$createdAt'),
                    Query.cursorAfter(last_item_id)
                ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getGalleryListPrevPage = async (first_item_id) => {
        try {
            return database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.limit(100),
                    Query.isNotNull("category"),
                    Query.orderDesc('$createdAt'),
                    Query.cursorBefore(first_item_id)
                ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const deleteGalleryByID = async (gallery_id) => {
        try {
            return database.deleteDocument(DATABASE_ID, COLLECTION_GALLERY_ID, gallery_id)

        } catch (error) {
            console.error(error)
            return error
        }
    }

    /*
     * Database > Production
     * Collection > category
     */
    const getCategoryList = async () => {
        try {
            return database.listDocuments(DATABASE_ID, COLLECTION_CATEGORY_ID,
                [
                        Query.limit(100),
                    ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }
    const getCategoryByID = async (category_id) => {
        try {
            return database.getDocument(DATABASE_ID, COLLECTION_CATEGORY_ID, category_id,
                // [
                //     Query.limit(100),
                // ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    /*
     * Storage > Buckets > gallery_images
     */
    const addStorageImage = async (image) => {
        try {
            return storage.createFile(STORAGE_BUCKET_ID, GenerateID, image);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getStorageImagesByID = async (image_id) => {
        try {
            return storage.getFileView(STORAGE_BUCKET_ID, image_id);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getStorageImagesThumbnailByID = async (image_id, width, percentage) => {
        try {
            return storage.getFilePreview(STORAGE_BUCKET_ID, image_id, Math.round(width * percentage)/*, Math.round(height * proportion)*/);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const deleteStorageImagesByID = async (image_id) => {
        try {
            return storage.deleteFile(STORAGE_BUCKET_ID, image_id);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const contextData = {
        user,
        handleLogin,
        handleLogout,

        addGalleryImages,
        addStorageImage,

        getGalleryList,
        getGalleryListNoNull,
        getGalleryListNextPage,
        getGalleryListPrevPage,
        getCategoryList,
        getCategoryByID,
        getStorageImagesByID,
        getStorageImagesThumbnailByID,

        deleteGalleryByID,
        deleteStorageImagesByID,
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? <Loader></Loader> : children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    return useContext(AuthContext)
}

export default AuthContext;