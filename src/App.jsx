import './App.css'

//react boostrap components
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel, Col, Container, Row} from "react-bootstrap";

//my components
import Header from "./components/header/Header.jsx";

//assets
import carousel1 from "./assets/img/carousel/carousel1.jpg"
import carousel2 from "./assets/img/carousel/carousel2.jpg"
import carousel3 from "./assets/img/carousel/carousel3.jpg"

function App() {

  return (
    <>
        <Header></Header>

        <Carousel slide>
            <Carousel.Item style={{height: "80vh", backgroundImage:"url(" + carousel1 + ")", backgroundSize:"cover", backgroundPosition: "center"}}>
                {/*<img*/}
                {/*    className="d-block w-100"*/}
                {/*    src={carousel1}*/}
                {/*    alt="First slide"*/}
                {/*/>*/}
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{height: "80vh", backgroundImage:"url(" + carousel2 + ")", backgroundSize:"cover", backgroundPosition: "center"}}>
                {/*<img*/}
                {/*    className="d-block w-100"*/}
                {/*    src={carousel2}*/}
                {/*    alt="Second slide"*/}
                {/*/>*/}
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item style={{height: "80vh", backgroundImage:"url(" + carousel3 + ")", backgroundSize:"cover", backgroundPosition: "center"}}>
                {/*<img*/}
                {/*    className="d-block w-100"*/}
                {/*    src={carousel3}*/}
                {/*    alt="Third slide"*/}
                {/*/>*/}
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    </>
  )
}


export default App
