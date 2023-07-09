import "./events.css";
import {Col, Container, Image, Row} from "react-bootstrap";

import appLogo from "/logo.svg"
function Events(){
    return(
        <>
            <Container className={"mt-5"}>
                <Row className={"text-center"}>
                    <h1>Events</h1>
                </Row>
                <Row className={"m-5"}>
                    <Col sm={8} md={8} >
                        <h2>Event 1</h2>
                        <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                    </Col>
                    <Col sm={4} md={4}>
                        <Image src={appLogo} rounded fluid />
                    </Col>
                </Row>
                <Row className={"m-5"}>
                    <Col sm={4} md={4}>
                        <Image src={appLogo} rounded fluid />
                    </Col>
                    <Col sm={8} md={8} >
                        <h2>Event 2</h2>
                        <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                    </Col>
                </Row>

                <Row className={"m-5"}>
                    <Col sm={8} md={8} >
                        <h2>Event 3</h2>
                        <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                    </Col>
                    <Col sm={4} md={4}>
                        <Image src={appLogo} rounded fluid />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Events