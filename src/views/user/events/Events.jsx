import "./events.css";
import {Col, Container, Image, Row} from "react-bootstrap";

// import appLogo from "/logo.svg"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import {Link} from "react-router-dom";

function Events(){
    return(
        <>
            <section className={"py-5"}>
                <Container>
                    <div className={"text-center mb-5"}>
                        <h2>Events</h2>
                        {/*<p>Ut tortor pretium viverra suspendisse potenti. Augue interdum velit euismod in. Cras pulvinar mattis nunc sed blandit libero. Pretium quam vulputate dignissim suspendisse in est.</p>*/}
                    </div>
                    <Row className={"align-items-center"}>
                        <Col md={6} className={"text-start px-5 py-3"}>
                            <h2>Casamentos</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <Link to={"/gallery"} >See more</Link>
                        </Col>
                        <Col md={6} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"py-5"}>
                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} className={"text-start px-5 py-3"}>
                            <h2>Batizados</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <Link to={"/gallery"} >See more</Link>
                        </Col>
                        <Col md={6} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"py-5"}>
                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} className={"text-start px-5 py-3"}>
                            <h2>Aniversários</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <Link to={"/gallery"} >See more</Link>
                        </Col>
                        <Col md={6} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={"py-5"}>
                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} className={"text-start px-5 py-3"}>
                            <h2>Festas temáticas</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <Link to={"/gallery"} >See more</Link>
                        </Col>
                        <Col md={6} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className={" py-5"}>
                <Container>
                    <Row className={"align-items-center"}>
                        <Col md={6} className={"text-start px-5 py-3"}>
                            <h2>Eventos Corporativos</h2>
                            <p>Adipiscing enim eu turpis egestas pretium aenean pharetra magna. Nisi est sit amet facilisis magna etiam tempor. Proin fermentum leo vel orci porta non pulvinar.</p>
                            <Link to={"/gallery"} >See more</Link>
                        </Col>
                        <Col md={6} className={"px-5 py-3"}>
                            <Image src={eventImage_casamento} rounded fluid />
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default Events