import "./events.css";
import {Col, Container, Image, Row} from "react-bootstrap";

// import appLogo from "/logo.svg"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import {useEffect} from "react";
import {HashLink} from "react-router-hash-link";

function Events(){
    /*scroll to top to reset scroll*/
    useEffect(() => window.scrollTo(0, 0), []);

    return(
        <>
            <section className={"events py-5"}>
                <Container>
                    {/*<div className={"text-center mb-5"}>*/}
                    {/*    <h2>Events</h2>*/}
                    {/*    /!*<p>Ut tortor pretium viverra suspendisse potenti. Augue interdum velit euismod in. Cras pulvinar mattis nunc sed blandit libero. Pretium quam vulputate dignissim suspendisse in est.</p>*!/*/}
                    {/*</div>*/}
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3 col-order"}>
                            <h1>Casamentos</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery#Casamentos"} >See more</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3"}>
                            <h1>Batizados</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery#Batizados"} >See more</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3 col-order"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3 col-order"}>
                            <h1>Aniversários</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >See more</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3"}>
                            <h1>Festas temáticas</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >See more</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3 col-order"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} xxl={7} className={"text-start px-5 py-3 col-order"}>
                            <h1>Eventos Corporativos</h1>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <HashLink to={"/gallery"} >See more</HashLink>
                        </Col>
                        <Col md={6} xxl={5} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} className={"shadow"} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Events