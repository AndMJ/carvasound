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
        getUserOnLoad() //TODO: session cookies giving an error?, not anymore i think
    },[])

    const getUserOnLoad = async () => {
        try {
            const userdata = await account.get()
            setUser(userdata)
        } catch (error) {
            //console.error(error)
        }
        setLoading(false)
    }

    const handleLogin = async (event, credentials) => { //TODO: handle all possible errors from API, like its done here, try{}catch{} await
        event.preventDefault()

        try {
            await account.createEmailSession(credentials.email, credentials.password)
            const userdata = await account.get()
            setUser(userdata)

            navigate("/admin")
        } catch (error) {
            //console.error(error)
            return error
        }
    }

    const handleLogout = async (/*event*/) => {
        //event.preventDefault()

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
            return await database.createDocument(DATABASE_ID, COLLECTION_GALLERY_ID, GenerateID, image_json);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getGalleryList = async () => {
        try {
            return await database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
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

    const getGalleryListAdmin = async (pageSize, offset) => {
        try {
            return await database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
                [
                    Query.limit(pageSize),
                    Query.orderDesc('$createdAt'),
                    Query.offset(offset)
                ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getGalleryListNoNull = async () => {
        try {
            return await database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
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
            return await database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
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
            return await database.listDocuments(DATABASE_ID, COLLECTION_GALLERY_ID,
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

    const updateGalleryByID = async (id, data) => {
        try {
            return await database.updateDocument(DATABASE_ID, COLLECTION_GALLERY_ID, id, data);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const deleteGalleryByID = async (gallery_id) => {
        try {
            return await database.deleteDocument(DATABASE_ID, COLLECTION_GALLERY_ID, gallery_id)

        } catch (error) {
            console.error(error)
            return error
        }
    }

    /*
     * Database > Production
     * Collection > category
     */
    const addCategory = async (category_json) => {
        try {
            return await database.createDocument(DATABASE_ID, COLLECTION_CATEGORY_ID, GenerateID, category_json);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getCategoryList = async () => {
        try {
            return await database.listDocuments(DATABASE_ID, COLLECTION_CATEGORY_ID,
                [
                        Query.limit(100),
                    ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getCategoryListNotNull = async () => {
        try {
            return await database.listDocuments(DATABASE_ID, COLLECTION_CATEGORY_ID,
                [
                    Query.limit(100),
                    Query.isNotNull("name"),
                ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getCategoryByID = async (category_id) => {
        try {
            return await database.getDocument(DATABASE_ID, COLLECTION_CATEGORY_ID, category_id,
                // [
                //     Query.limit(100),
                // ]
            );

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const updateCategoryByID = async (id, data) => {
        try {
            return await database.updateDocument(DATABASE_ID, COLLECTION_CATEGORY_ID, id, data);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const deleteCategoryByID = async (category_id) => {
        try {
            return await database.deleteDocument(DATABASE_ID, COLLECTION_CATEGORY_ID, category_id)

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
            return await storage.createFile(STORAGE_BUCKET_ID, GenerateID, image);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getStorageImagesByID = async (image_id) => {
        try {
            return await storage.getFileView(STORAGE_BUCKET_ID, image_id);

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const getStorageImagesThumbnailByID = async (image_id, width, percentage) => {
        try {
            return await storage.getFilePreview(STORAGE_BUCKET_ID, image_id, Math.round(width * percentage));

        } catch (error) {
            console.error(error)
            return error
        }
    }

    const deleteStorageImagesByID = async (image_id) => {
        try {
            return await storage.deleteFile(STORAGE_BUCKET_ID, image_id);

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
        addCategory,
        addStorageImage,

        getGalleryList,
        getGalleryListAdmin,
        getGalleryListNoNull,
        getGalleryListNextPage,
        getGalleryListPrevPage,
        getCategoryList,
        //getCategoryListNotNull, //TODO: get only the categories that have at least 1 image associated
        getCategoryByID,
        getStorageImagesByID,
        getStorageImagesThumbnailByID,

        updateGalleryByID,
        updateCategoryByID,

        deleteGalleryByID,
        deleteCategoryByID,
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