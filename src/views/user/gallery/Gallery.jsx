import "./gallery.css";
import {Col, Container, Row, Image} from "react-bootstrap";

import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import React, {useState} from "react";

function Gallery(){

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

    return(
        <React.Suspense fallback={<div>LOADING ...</div>}>
            <section className={"my-5"}>
                {/*<Container className={"category py-5"}>*/}
                {/*    <Row className={"title text-center mb-5"}>*/}
                {/*        <h2 id={"Casamentos"}>Casamentos</h2>*/}
                {/*    </Row>*/}
                {/*    <Row className={"justify-content-evenly"}>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*        <Col xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>*/}
                {/*            <Image src={eventImage_casamento} rounded fluid/>*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Container>*/}

                {GalleryImages.map(category => {
                    return (
                        <Container key={category.categoryId} className={"category mb-5"}>
                            <Row className={"title text-center mb-3"}>
                                <h2 id={category.categoryName}>{category.categoryName}</h2>
                            </Row>
                            <Row className={"justify-content-evenly"}>
                                {category.images.map(image => {
                                    return (
                                        <Col key={image.id} xs={6} sm={6} md={4} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                                            <Image src={image.path} rounded fluid/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Container>
                    )
                })}
            </section>
        </React.Suspense>
    )
}

export default Gallery