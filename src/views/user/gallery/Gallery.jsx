import "./gallery.css";
import {useEffect, useState} from "react";

import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

import {useAuth} from "../../../utils/authContext.jsx";
import client, {COLLECTION_GALLERY_ID, DATABASE_ID} from "../../../appwrite/appwrite.config.jsx";
import {LinearProgress, ToggleButton, ToggleButtonGroup} from "@mui/material";

//import { motion } from "framer-motion"

//import eventImage_casamento from "../../../assets/img/events/casamento.jpg"

function GalleryBox(){

    const {getGalleryList, getStorageImagesByID, getCategoryByID, getCategoryList, getGalleryByCategory} = useAuth();

    const [gallery, setGallery] = useState([])
    const [filter, setFilter] = useState(null)
    const [categories, setCategories] = useState([])
    const [LoadingState, setLoadingState] = useState(true);

    useEffect(() => {
        const subscription = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_GALLERY_ID}.documents`, response => {
            // Callback will be executed on changes for all files.

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.info("create ", response.payload);

                //TODO: temporary callAll. change to call just when all image files are uploaded

                // setLoadingState(true)
                formatGalleryData()
                    .then((response) => {

                        if (response.length > 0){
                            setGallery(response)
                        }
                        // setLoadingState(false)
                    })
            }

            if(response.events.includes("databases.*.collections.*.documents.*.update")){
                //TODO: on DB update
                console.info("update ", response.payload);
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.info("delete ", response.payload);
                /*setRows(prevState => {
                    return prevState.filter(row => row.id !== response.payload.$id)
                })*/
                // setLoadingState(true)
                formatGalleryData()
                    .then((response) => {

                        if (response.length > 0){
                            setGallery(response)
                        }
                        // setLoadingState(false)
                    })
            }
        });

        return () => {
            subscription();
        };
    }, []);

    useEffect(() =>  {
        formatGalleryData()
            .then((response) => {
                if (response.length > 0){
                    setGallery(response)
                }
                setLoadingState(false)
            })

        return () => {
            setGallery([]);
        };
    }, [])

    const formatGalleryData = async () => {
        const gallery_data = await getGalleryList()
        let dataArray = [];

        for (let row of gallery_data.documents) {
            let category = null;
            const image_path = await getStorageImagesByID(row.image_id)

            //console.log("dsada " + row.category_id)
            if(row.category_id !== null){
                category = await getCategoryByID(row.category_id)
                //console.log("IN: " + category)
            }

            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.push({
                id: row.$id,
                category_id: row.category_id,
                category: category !== null ? category.name : null,
                image_id: row.image_id,
                image: image_path.toString(),
                width: row.width !== null ? row.width : 0,
                height: row.height !== null ? row.height : 0,
                createdAt: creAt.toLocaleString('en-GB'),
                updatedAt: upAt.toLocaleString('en-GB'),
            })
        }
        return dataArray
    }

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response)
            })

        return () => {
            setCategories([]);
        };
    }, []);

    const getCategories = async () => {
        const categories = await getCategoryList()
        return categories.documents
    }

    const handleGalleryFiltering = (e, category_id) => {
        setFilter(category_id)
    }

    return (
        <>
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col">
                    <ToggleButtonGroup
                        color="primary"
                        value={filter}
                        exclusive
                        onChange={handleGalleryFiltering}
                    >
                        {categories?.map((categ, index) => {
                            return (
                                <ToggleButton key={index} value={categ.$id}>{categ.name}</ToggleButton>
                            )
                        })}
                    </ToggleButtonGroup>
                </div>

                <Gallery>
                    <div className="row mt-4">
                        {/*
                        TODO:   - try to build gallery in mosaic, https://mui.com/material-ui/react-image-list/#masonry-image-list
                                - use appwrite subscribe feature to update page content on database changes
                                - pagination or "load more"
                                - better "gallery loading"
                                - implement image thumbnails
                        */}

                        {LoadingState && <LinearProgress className={"mb-3"}/>}

                        {gallery?.map((image, index) => {
                            if(filter /*|| filter.lenght > 0*/){
                                if (filter.includes(image.category_id))
                                return (
                                    <div key={index} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                                        <Item
                                            original={image.image}
                                            thumbnail={image.image}
                                            width={image.width}
                                            height={image.height}
                                            alt={image.category}
                                        >
                                            {({ ref, open }) => (
                                                <img
                                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                                    style={{ cursor: 'pointer' }}
                                                    src={image.image}
                                                    ref={ref} onClick={open}
                                                />
                                            )}
                                        </Item>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={index} className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                                        <Item
                                            original={image.image}
                                            thumbnail={image.image}
                                            width={image.width}
                                            height={image.height}
                                            alt={image.category}
                                        >
                                            {({ ref, open }) => (
                                                <img
                                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                                    style={{ cursor: 'pointer' }}
                                                    src={image.image}
                                                    ref={ref} onClick={open}
                                                />
                                            )}
                                        </Item>
                                    </div>
                                )
                            }

                        })}


                    </div>
                </Gallery>
            </div>

        </>
    );
}

export default GalleryBox