import "./notFound.css"
import {Container, Row, Image, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FaArrowLeft} from "react-icons/fa";

//assets
import image404 from "../../assets/img/not_found/page-not-found.png"

function NotFound (){
    return (
        <>
            <section>
                <Container>
                    <Row className={"text-center pt-5"}>
                        <Col sm={12}>
                            <Image src={image404} rounded />
                        </Col>
                        <Col sm={12} className={"py-5"}>
                            <Link to={"/"}> <FaArrowLeft/> Go back to Home</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default NotFound;