import "./home.css";

import {Carousel, Col, Container, Image, Row} from "react-bootstrap";

//import carousel1 from "../../../assets/img/carousel/carousel1.jpg";
import carousel2 from "../../../assets/img/carousel/carousel2.jpg";
import carousel3 from "../../../assets/img/carousel/carousel3.jpg";
import carousel4 from "../../../assets/img/carousel/carousel4.jpg";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

function Home(){
    return(
        <>
            <section className={"home"}>
                <Container className={"position-absolute top-50 start-50 translate-middle z-3"}>
                    <Col md={8} className={"mx-auto text-center"}>
                        <div className={"caption"}>
                            <h1>som profissional</h1>
                            <p className={"lead"}>escolha a sua música para um momento especifico</p>
                        </div>
                    </Col>
                </Container>
                <Swiper
                    slidesPerView={1}
                    // spaceBetween={8}
                    // effect={'fade'}
                    centeredSlides={true}
                    loop={true}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="home-swiper"
                >
                    <SwiperSlide style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + carousel4 + ")"}}></SwiperSlide>
                    <SwiperSlide style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + carousel3 + ")"}}></SwiperSlide>
                    <SwiperSlide style={{backgroundImage:"linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(" + carousel2 + ")"}}></SwiperSlide>
                </Swiper>
            </section>
        </>
    )
}

export default Home