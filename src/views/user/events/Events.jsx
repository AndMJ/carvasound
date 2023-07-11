import "./events.css";
import {Col, Container, Image, Row} from "react-bootstrap";

import appLogo from "/logo.svg"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"

function Events(){
    return(
        <>
            <Container>
                <Row className={"text-center mt-5"}>
                    <h1>Events</h1>
                    <p>Ut tortor pretium viverra suspendisse potenti. Augue interdum velit euismod in. Cras pulvinar mattis nunc sed blandit libero. Pretium quam vulputate dignissim suspendisse in est.</p>
                </Row>
            </Container>

            <section className={"mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6} className={"event-text"}>
                            <h2>Casamentos</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                        <Col md={6}>
                            <Image src={eventImage_casamento} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"bg-light mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                        <Col md={6} className={"event-text"}>
                            <h2>Festas temáticas</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6} className={"event-text"}>
                            <h2>Aniversários</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"bg-light mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                        <Col md={6} className={"event-text"}>
                            <h2>Palestras</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6} className={"event-text"}>
                            <h2>Workshops</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"bg-light mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                        <Col md={6} className={"event-text"}>
                            <h2>Apresentações</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6} className={"event-text"}>
                            <h2>Batizados</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"bg-light mt-5 py-5"}>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Image src={appLogo} rounded fluid />
                        </Col>
                        <Col md={6} className={"event-text"}>
                            <h2>Eventos online</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Events