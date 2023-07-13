import "./gallery.css";
import {Col, Container, Row, Image} from "react-bootstrap";

import appLogo from "/logo.svg"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"

function Gallery(){
    return(
        <>
            <section className={"my-3"}>
                <Container className={"category py-5"}>
                    <Row className={"title text-center mb-5"}>
                        <h2 id={"Casamentos"}>Casamentos</h2>
                    </Row>
                    <Row className={"justify-content-evenly"}>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                    </Row>
                </Container>

                <Container className={"category my-3"}>
                    <Row className={"title text-center mb-5"}>
                        <h2 id={"Batizados"}>Batizados</h2>
                    </Row>
                    <Row className={"justify-content-evenly"}>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                        <Col xs={4} sm={4} md={3} className={"p-3 p-sm-3 p-md-3 p-lg-4"}>
                            <Image src={eventImage_casamento} rounded fluid/>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Gallery