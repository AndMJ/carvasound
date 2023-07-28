import "./events.css";
import {Col, Container, Image, Row} from "react-bootstrap";

// import appLogo from "/logo.svg"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import React, {useEffect} from "react";
import {HashLink} from "react-router-hash-link";

import { motion } from "framer-motion"
function Events(){
    /*scroll to top to reset scroll*/
    useEffect(() => window.scrollTo(0, 0), []);

    return(
        <>
            <motion.section
                className={"events py-5"}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ delay: 0.5 }}
            >

                <Container className={"title mb-5"}>
                    <Row className={"text-center"}>
                        <h2>Eventos</h2>
                    </Row>
                </Container>

                <Container className={"mb-5"}>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3 col-order"}>
                            <h1>Casamentos</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            {/*<HashLink to={"/gallery#Casamentos"} >See more</HashLink>*/}
                            <HashLink to={"/gallery"} >Ver mais</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container className={"mb-5"}>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3"}>
                            <h1>Batizados</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >Ver mais</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3 col-order"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container className={"mb-5"}>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3 col-order"}>
                            <h1>Aniversários</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >Ver mais</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container className={"mb-5"}>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3"}>
                            <h1>Festas temáticas</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >Ver mais</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3 col-order"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container className={"mb-5"}>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3 col-order"}>
                            <h1>Eventos Corporativos</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >Ver mais</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </motion.section>
        </>
    )
}

export default Events