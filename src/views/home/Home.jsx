import "./home.css";

import {Carousel} from "react-bootstrap";

import carousel1 from "../../assets/img/carousel/carousel1.jpg";
import carousel2 from "../../assets/img/carousel/carousel2.jpg";
import carousel3 from "../../assets/img/carousel/carousel3.jpg";
import carousel4 from "../../assets/img/carousel/carousel4.jpg";

function Home(){
    return(
        <>
            <Carousel slide>
                <Carousel.Item style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + carousel4 + ")"}}>
                    <Carousel.Caption>
                        <h1>Som profissional</h1>
                        <h4>Escolha a sua musica para um momento especifico</h4>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + carousel3 + ")"}}>
                    <Carousel.Caption>
                        <h1>Varios eventos</h1>
                        <h4>Realizamos varios tipos de eventos</h4>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + carousel2 + ")"}}>
                    <Carousel.Caption>
                        <h1>DJ New</h1>
                        <h4>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</h4>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}

export default Home