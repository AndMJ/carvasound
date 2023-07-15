import "./gallery.css";
import {Col, Container, Row, Image} from "react-bootstrap";

import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import React, {useEffect, useState} from "react";
import {FaHashtag} from "react-icons/fa";

import { motion } from "framer-motion"

const ImageModal = (props) => {
    const handleEvent = (e) => {
        /*checks if the click that is done, is not the image, so it doenst close
        * just when outside the image is clicked*/
        if (e.target.classList.contains("backdrop")){
            props.setImgToModal(null)
        }
    }

    return (
        <div className={"backdrop"} onClick={handleEvent}>
            <img src={props.ImgToModal} alt={"future image name or description"} />
        </div>
    )
}

function Gallery(){
    /*scroll to top to reset scroll*/
    useEffect(() => window.scrollTo(0, 0), []);

    const [GalleryImages,setGalleryImages] = useState([
        {
            categoryId: 1,
            categoryName: "Casamentos",
            images: [
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                }
            ]
        },
        {
            categoryId: 2,
            categoryName: "Batizados",
            images: [
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                },
                {
                    id: crypto.randomUUID(), path: eventImage_casamento
                }
            ]
        }
    ])

    const [ImgToModal, setImgToModal] = useState(null)

    return(
        <>
            <motion.section
                className={"my-5"}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ delay: 0.5 }}
            >

                <Container className={"category mb-5"}>
                    <Row className={"text-center"}>
                        <h2>Gallery</h2>
                    </Row>
                </Container>

                {GalleryImages.map(category => {
                    return (
                        <Container id={category.categoryName} key={category.categoryId} className={"category mb-5"}>
                            <Row className={"title mb-3 px-3"}>
                                <h4> <FaHashtag style={ {color: "var(--custom-color-primary)"} }/> {category.categoryName} { (category.images.length === 0) && <span className={"badge badge bg-secondary"}>Images soon</span> }</h4>
                            </Row>
                            <Row className={"justify-content-evenly"}>
                                {
                                    (category.images.length !== 0) &&
                                        category.images.map(image => {
                                            return (
                                                <Col key={image.id} xs={12} sm={12} md={6} lg={4} className={"p-3"}>
                                                    <Image src={image.path} rounded fluid className={"shadow"} onClick={()=>{setImgToModal(image.path)}} />
                                                </Col>
                                            )
                                        })
                                }
                            </Row>
                        </Container>
                    )
                })}

            </motion.section>

            {ImgToModal && <ImageModal ImgToModal={ImgToModal} setImgToModal={setImgToModal}></ImageModal>}

        </>
    )
}

export default Gallery