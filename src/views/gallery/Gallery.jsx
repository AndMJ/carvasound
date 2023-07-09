import "./gallery.css";
import {Col, Container, Row, Image} from "react-bootstrap";

import appLogo from "/logo.svg"
function Gallery(){
    return(
        <>
            <Container className={"mt-5"}>
                <Row>
                    <h1>Gallery</h1>
                </Row>
                <Row>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                </Row>
                <Row>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                    <Col xs={3} md={4}>
                        <Image src={appLogo} rounded />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Gallery