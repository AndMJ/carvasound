import "./notFound.css"
import {Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function NotFound (){
    return (
        <>
            <section>
                <Container>
                    <Row className={"text-center pt-5"}>
                        <h1>404 - Not Found</h1>
                        <Link to={"/"} >Go back to Home</Link>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default NotFound;