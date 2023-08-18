import "./contact.css";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

import { motion } from "framer-motion"

function Contact(){
    return(
        <>
            <motion.section
                className={"my-5"}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                transition={{ delay: 0.5 }}
            >
                <Container className={"contact-wrapper mb-5 justify-content-center"}>
                    <Row className={"title text-center mb-5"}>
                        <h2>Contactos</h2>
                    </Row>

                    <Row className={"mb-3"}>
                        <Col sm={12} md={6} className={"mb-3"}>
                            <Card>
                                <Card.Body >
                                    <Card.Title>Telemóvel</Card.Title>
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
                        <Form.Group className="mb-3" controlId="formGridName" >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Seu nome" required />
                        </Form.Group>

                        <Row className="mb-3">
                            <Col md={6} className="mb-3 mb-md-0">
                                <Form.Group controlId="formGridEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="exemplo@email.com" required />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formGridPhoneNumber">
                                    <Form.Label>Telemóvel</Form.Label>
                                    <Form.Control type="tel" placeholder="912 345 678" minLength={9} maxLength={16} required />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3" controlId="formGridSubject">
                            <Form.Label>Assunto</Form.Label>
                            <Form.Control placeholder="casamento, batizado..." required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress2">
                            <Form.Label>Mensagem</Form.Label>
                            <Form.Control as={"textarea"} placeholder="Mensagem" required />
                        </Form.Group>

                        <Button variant="primary" type="submit" className={"d-block mx-auto"}>
                            Enviar
                        </Button>
                    </Form>
                </Container>
            </motion.section>
        </>
    )
}

export default Contact