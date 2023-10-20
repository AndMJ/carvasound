import "./gallery.css";
import {useEffect, useState} from "react";

import 'photoswipe/dist/photoswipe.css'
import { Gallery, Item } from 'react-photoswipe-gallery'

import {useAuth} from "../../../utils/authContext.jsx";

//import { motion } from "framer-motion"

//import eventImage_casamento from "../../../assets/img/events/casamento.jpg"

function GalleryBox(){

    const {getGalleryList, getStorageImagesByID, getCategoryByID} = useAuth();

    const [gallery, setGallery] = useState([])

    useEffect(() =>  {
        formatGalleryData()
            .then((response) => {
                if (response.length > 0){
                    setGallery(response)
                }
                //setLoadingState(false)
            })
    }, [])

    function getImageSize(imgSrc) {
        let imgLoader = new Image();
        imgLoader.src = imgSrc;
        return {width: imgLoader.width, height: imgLoader.height}
    }

    const formatGalleryData = async () => {
        const gallery_data = await getGalleryList()

        let dataArray = []

        for (let row of gallery_data.documents) {
            let category = null;
            const image_path = await getStorageImagesByID(row.image_id)

            //console.log("dsada " + row.category_id)
            if(row.category_id !== null){
                category = await getCategoryByID(row.category_id)
                //console.log("IN: " + category)
            }

            let image_size = getImageSize(image_path)

            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.push({
                id: row.$id,
                category_id: row.category_id,
                category: category !== null ? category.name : null,
                image_id: row.image_id,
                image: image_path,
                image_size: image_size,
                createdAt: creAt.toLocaleString('en-GB'),
                updatedAt: upAt.toLocaleString('en-GB'),
            })
        }
        return dataArray
    }

    return (
        <>
            <Gallery>
                <div className="row mt-4">
                    {/*<div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                        <Item
                            original="https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpg"
                            thumbnail="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
                            width="1600"
                            height="1600"
                            alt="Photo of seashore by Folkert Gorter"
                        >
                            {({ ref, open }) => (
                                <img
                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                    style={{ cursor: 'pointer' }}
                                    src="https://farm4.staticflickr.com/3894/15008518202_b016d7d289_m.jpg"
                                    ref={ref} onClick={open}
                                />
                            )}
                        </Item>
                        <Item
                            original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
                            thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
                            width="1600"
                            height="1068"
                            alt="Photo of mountain lake by Samuel Rohl"
                        >
                            {({ ref, open }) => (
                                <img
                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                    src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
                                    ref={ref} onClick={open}
                                />
                            )}
                        </Item>
                    </div>

                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <Item
                            original="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg"
                            thumbnail="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
                            width="1600"
                            height="1066"
                            alt="Photo of fog in the village by Ales Krivec"
                        >
                            {({ ref, open }) => (
                                <img
                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                    src="https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg"
                                    ref={ref} onClick={open}
                                />
                            )}
                        </Item>
                        <Item
                            original="https://farm6.staticflickr.com/5584/14985868676_b51baa4071_h.jpg"
                            thumbnail="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
                            width="1600"
                            height="1066"
                            alt="Photo of river sunset by Michael Hull"
                        >
                            {({ ref, open }) => (
                                <img
                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                    src="https://farm6.staticflickr.com/5584/14985868676_4b802b932a_m.jpg"
                                    ref={ref} onClick={open}
                                />
                            )}
                        </Item>
                    </div>

                    <div className="col-lg-4 mb-4 mb-lg-0">
                        <Item
                            original="https://farm4.staticflickr.com/3920/15008465772_d50c8f0531_h.jpg"
                            thumbnail="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
                            width="1600"
                            height="1066"
                            alt="Photo of bear by Thomas Lefebvre"
                        >
                            {({ ref, open }) => (
                                <img
                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                    src="https://farm4.staticflickr.com/3920/15008465772_383e697089_m.jpg"
                                    ref={ref} onClick={open}
                                />
                            )}
                        </Item>
                        <Item
                            original="https://farm6.staticflickr.com/5591/15008867125_b61960af01_h.jpg"
                            thumbnail="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
                            width="1600"
                            height="1068"
                            alt="Photo of mountain lake by Samuel Rohl"
                        >
                            {({ ref, open }) => (
                                <img
                                    className={"w-100 shadow-1-strong rounded mb-4"}
                                    src="https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg"
                                    ref={ref} onClick={open}
                                />
                            )}
                        </Item>
                    </div>*/}

                    {/*TODO: try to build gallery in mosaic*/}

                    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
                        {gallery?.map((image, index) => {
                            return (
                                <Item key={index}
                                    original={image.image}
                                    thumbnail={image.image}
                                    width={image.image_size.width}
                                    height={image.image_size.height}
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
                            )
                        })}
                    </div>

                </div>
            </Gallery>
        </>
    );
}

export default GalleryBox