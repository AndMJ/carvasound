import "./contact.css";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

function Contact(){
    return(
        <>
            <section className={"my-3"}>
                <Container className={"contact-wrapper py-5 justify-content-center"}>
                    <Row className={"title text-center mb-5"}>
                        <h2>Contact me</h2>
                    </Row>

                    <Row className={"mb-3"}>
                        <Col sm={12} md={6} className={"mb-3"}>
                            <Card>
                                <Card.Body >
                                    <Card.Title>Phone</Card.Title>
                                    {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                                    <Card.Text><a href={"tel:+351967208626"}>+351 967 208 626</a></Card.Text>
                                    {/*<Card.Link href="#">Card Link</Card.Link>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col sm={12} md={6} className={"mb-3"}>
                            <Card>
                                <Card.Body >
                                    <Card.Title>Email</Card.Title>
                                    {/*<Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>*/}
                                    <Card.Text><a href={"mailto:geral.carvasound@hotmail.com"}>geral.carvasound@hotmail.com</a></Card.Text>
                                    {/*<Card.Link href="#">Card Link</Card.Link>*/}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <Form className={"contactForm"} method={"POST"}>
                        <Row className="mb-3">
                            <Col md={6}>
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Your Name</Form.Label>
                                    <Form.Control type="text" placeholder="Your name" required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Your Email</Form.Label>
                                    <Form.Control type="email" placeholder="Enter your email" required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridSubject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control placeholder="Subject" required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as={"textarea"} placeholder="Message" required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className={"d-block mx-auto"}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </section>
        </>
    )
}

export default Contact