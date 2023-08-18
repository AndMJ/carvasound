import "./notFound.css"
import {Container, Row, Image, Col} from "react-bootstrap";
import {FaArrowLeft} from "react-icons/fa";
import {Link} from "react-router-dom";

//assets
import image404 from "../../assets/img/not_found/page-not-found.png"


function PageNotFound (){
    const handleClick = (e) => {
        e.preventDefault()
        history.back()
    }

    return (
        <>
            <section className={"page404"}>
                <Container>
                    <Row className={"text-center pt-5"}>
                        <Col sm={12}>
                            <Image src={image404} rounded fluid />
                        </Col>
                        <Col sm={12} className={"py-5"}>
                            <p className="lead">Pagina não foi encontrada no servidor.</p>
                            {/*<button className={"btn btn-primary"} onClick={handleClick}><FaArrowLeft/> Go back</button>*/}
                            <Link to={"/"} className={"btn btn-primary"} onClick={handleClick}><FaArrowLeft/> Go back to Home</Link>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}

export default PageNotFound;