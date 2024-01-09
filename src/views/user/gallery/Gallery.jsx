import "./gallery.css";
import {useEffect, useMemo, useState} from "react";

import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

import {useAuth} from "../../../utils/authContext.jsx";
import client, {COLLECTION_GALLERY_ID, DATABASE_ID} from "../../../appwrite/appwrite.config.jsx";
import {
    CircularProgress,
    ImageList,
    ImageListItem,
    LinearProgress,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import {scrollToElement} from "../../../utils/scrollToElement.jsx";
import {color} from "framer-motion";
import {FaAngleLeft, FaAngleRight} from "react-icons/fa6";
//import {scrollToElement} from "../../../utils/scrollToElement.jsx";

import { motion } from "framer-motion"


function GalleryBox(){

    const {getGalleryList, getCategoryList, getGalleryListNoNull, getGalleryListNextPage, getGalleryListPrevPage} = useAuth();

    const [gallery, setGallery] = useState([])
    const [galleryCols, setGalleryCols] = useState(3)
    const [filter, setFilter] = useState(null)
    const [galleryTotal, setGalleryTotal] = useState(0)
    const [categories, setCategories] = useState([])
    const [LoadingState, setLoadingState] = useState(true);

    useEffect(() => { //set image list columns by window size
        const mediaQuery = window.matchMedia('(max-width: 1200px)')
        function handleTabletChange(e) {
            // Check if the media query is true
            if (e.matches) {
                setGalleryCols(2)
            } else {
                setGalleryCols(3)
            }
        }
        // Register event listener
        mediaQuery.addListener(handleTabletChange)
        // Initial check
        handleTabletChange(mediaQuery)
    }, []);

    useEffect(() => {
        const subscription = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_GALLERY_ID}.documents`, response => {
            // Callback will be executed on changes for all files.

            if(
                response.events.includes("databases.*.collections.*.documents.*.create") ||
                response.events.includes("databases.*.collections.*.documents.*.update") ||
                response.events.includes("databases.*.collections.*.documents.*.delete")
            ){
                console.info("DB TRIGGER: ", response.payload);

                setLoadingState(true)
                formatGalleryData()
                    .then((response) => {

                        if (response.length > 0){
                            setGallery(response)
                        }
                        setLoadingState(false)
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
                console.log(response)
                if (response.length > 0){
                    setGallery(response)
                }
                setLoadingState(false)
            })

        return () => {
            setGallery([]);
        };
    }, [])

    //TODO: DONE? - change the scripts that get the images, to get DB data without getting the images,
    // its doing all at the same time (its getting all rows and getting the image corresponding to that row),
    // so its slowing the gallery load time
    const formatGalleryData = async () => {
        const gallery_data = await getGalleryListNoNull()
        setGalleryTotal(gallery_data.total)

        let dataArray = [];
        for (let row of gallery_data.documents) {
            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.push({
                id: row.$id,
                category_id: row.category.$id,
                // category: category !== null ? category.name : null,
                image_id: row.image_id,
                image: null/*image_path.toString()*/,
                image_thumb: null/*image_thumb_path.toString()*/,
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

    const galleryLoadNext = async () => {

        setLoadingState(true)

        //console.log(gallery[gallery.length - 1].id)
        const last_item_id = gallery[gallery.length - 1].id
        const nextPage = await getGalleryListNextPage(last_item_id)
        //console.log("next: ", nextPage)

        if(nextPage.documents.length === 0){
            console.log("vazio")
            setLoadingState(false)
            return
        }

        let dataArray = [];
        for (let row of nextPage.documents) {
            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.push({
                id: row.$id,
                category_id: row.category.$id,
                //category: category !== null ? category.name : null,
                image_id: row.image_id,
                image: null/*image_path.toString()*/,
                image_thumb: null/*image_thumb_path.toString()*/,
                width: row.width !== null ? row.width : 0,
                height: row.height !== null ? row.height : 0,
                createdAt: creAt.toLocaleString('en-GB'),
                updatedAt: upAt.toLocaleString('en-GB'),
            })
        }

        setGallery(dataArray)
        setLoadingState(false)
    }

    const galleryLoadPrev = async () => {

        setLoadingState(true)

        //console.log(gallery[0].id)
        const first_item_id = gallery[0].id
        const prevPage = await getGalleryListPrevPage(first_item_id)
        //console.log("prev: ",prevPage)

        if(prevPage.documents.length === 0){
            console.log("vazio")
            setLoadingState(false)
            return
        }

        let dataArray = [];
        for (let row of prevPage.documents) {
            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.push({
                id: row.$id,
                category_id: row.category.$id,
                //category: category !== null ? category.name : null,
                image_id: row.image_id,
                image: null/*image_path.toString()*/,
                image_thumb: null/*image_thumb_path.toString()*/,
                width: row.width !== null ? row.width : 0,
                height: row.height !== null ? row.height : 0,
                createdAt: creAt.toLocaleString('en-GB'),
                updatedAt: upAt.toLocaleString('en-GB'),
            })
        }

        setGallery(dataArray)
        setLoadingState(false)
    }

    // console.log(galleryTotal)
    // console.log(gallery.length)

    return (
        <>
            {/*
            TODO:   - pagination is slow, make it so the image becomes a component and loads images from db dynamically
                    - better "gallery loading each image" animations
                    DONE? - responsive togglebuttons, https://mui.com/material-ui/react-grid/#grid-with-multiple-breakpoints
            */}
            <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                <div className="col-auto"> {/*col-lg-8*/}
                    <ToggleButtonGroup
                        sx={{
                            //gap: 1,
                            display: "flex",
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            bgcolor: "rgba(128,128,128,0.08)"
                        }}
                        color={"primary"}
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
                        <ImageList variant="masonry" cols={galleryCols} gap={8}> {/*variant="masonry"*/}
                            {gallery?.map((image, index) => {
                                if(filter /*|| filter.lenght > 0*/){
                                    if (filter.includes(image.category_id))
                                        return (
                                            <ImageListItem key={index}>
                                                <Image key={index} image_data={image}></Image>
                                            </ImageListItem>
                                        )
                                } else {
                                    return (
                                        <ImageListItem key={index}>
                                            <Image key={index} image_data={image}></Image>
                                        </ImageListItem>
                                    )
                                }

                            })}
                        </ImageList>
                    </div>

                </Gallery>

                {LoadingState &&
                    <div className={"row d-flex justify-content-center"}>
                        <div className="col-lg-8 my-3">
                            <CircularProgress sx={{color: "#cf5331"}}/>
                        </div>
                    </div>
                }

                {(gallery.length < galleryTotal) &&
                    <div className="row gx-4 align-self-baseline d-flex justify-content-center align-items-center">
                        <div className="col-auto">
                            <button disabled={LoadingState} className="btn btn-primary" onClick={() => galleryLoadPrev()}><FaAngleLeft  size={20}></FaAngleLeft> </button>
                        </div>
                        <div className="col-auto">
                            <button disabled={LoadingState} className="btn btn-primary" onClick={() => galleryLoadNext()}><FaAngleRight size={20}></FaAngleRight> </button>
                        </div>
                    </div>
                }

            </div>

        </>
    );
}

const Image = ({image_data}) => {

    const {getStorageImagesByID, getStorageImagesThumbnailByID} = useAuth();
    const [imageData, setImageData] = useState(image_data)

    //console.log(imageData)

    useEffect(() => {
        getImagePath()
            .then((response) => {
                setImageData((curr) => {
                    return {...curr, image: response.image_path.toString(), image_thumb: response.image_thumb_path.toString()}
                })
            })
    }, [])

    const getImagePath = async () => {
        const image_path = await getStorageImagesByID(image_data.image_id)
        const image_thumb_path = await getStorageImagesThumbnailByID(image_data.image_id, image_data.width, 0.17)

        return {image_path, image_thumb_path};
    }

    /*const placeholderSrc = "https://w.wallhaven.cc/full/dg/wallhaven-dgxk6o.png"
    const src = ""
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImgSrc(src);
        };
    }, [src]);*/

    return (
        <Item
            original={imageData.image}
            thumbnail={imageData.image_thumb}
            width={imageData.width}
            height={imageData.height}
            alt={imageData.category}
        >
            {({ ref, open }) => (
                <motion.div
                    layout
                    style={{opacity: 0.93}}
                    whileHover={{opacity: 1}}
                >
                    <img
                        className={"w-100 shadow-1-strong rounded"}
                        style={{ cursor: 'pointer' }}
                        src={imageData.image_thumb}
                        ref={ref} onClick={open}
                        loading={"lazy"}
                    />
                </motion.div>
            )}
        </Item>
    )
}

export default GalleryBox