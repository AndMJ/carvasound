import "./landingPage.css"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";


const LandingPage = () => {

    //scrollspy, changes activeSection state to whatever section is visible on page
    const [activeSection, setActiveSection, sectionRefs] = useOutletContext();
    useEffect(() => {
        const handleScroll = () => {
            for (const sectionId in sectionRefs) {
                const sectionRef = sectionRefs[sectionId];
                const rect = sectionRef.current.getBoundingClientRect();

                // Check if at least 50% of the section is visible in the viewport
                if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                    setActiveSection(sectionId);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            {/*<!-- Masthead-->*/}
            <header className="masthead" ref={sectionRefs.main}>
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">Carvasound, Sons para todas as ocasiões</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Deixe-nos cuidar da parte técnica para que tenha um bom momento. Com som profissional e uma presença contagiante, terá uma experiência única.</p>
                            <a className="btn btn-primary btn-xl" href="#about">Ver Mais</a>
                        </div>
                    </div>
                </div>
            </header>
            {/*<!-- About-->*/}
            <section className="page-section bg-primary" id="about" ref={sectionRefs.about}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Start Bootstrap has everything you need to get your new website up and running in no time! Choose one of our open source, free to download, and easy to use themes! No strings attached!</p>
                            <a className="btn btn-light btn-xl" href="#services">Get Started!</a>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Services-->*/}
            <section className="page-section" id="services" ref={sectionRefs.services}>
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">At Your Service</h2>
                    <hr className="divider" />
                    <div className="row gx-4 gx-lg-5">
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Sturdy Themes</h3>
                                <p className="text-muted mb-0">Our themes are updated regularly to keep them bug free!</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Up to Date</h3>
                                <p className="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Ready to Publish</h3>
                                <p className="text-muted mb-0">You can use this design as is, or you can make changes!</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                                <h3 className="h4 mb-2">Made with Love</h3>
                                <p className="text-muted mb-0">Is it really open source if it's not made with love?</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Portfolio-->*/}
            <section id="portfolio" ref={sectionRefs.gallery}>
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption p-3">
                                    <div className="project-category text-white-50">Category</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Call to action-->*/}
            <section className="page-section bg-dark text-white">
                <div className="container px-4 px-lg-5 text-center">
                    <h2 className="mb-4">Free Download at Start Bootstrap!</h2>
                    <a className="btn btn-light btn-xl" href="https://startbootstrap.com/theme/creative/">Download Now!</a>
                </div>
            </section>
            {/*<!-- Contact-->*/}
            <section className="page-section" id="contact" ref={sectionRefs.contact}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6 text-center">
                            <h2 className="mt-0">Let's Get In Touch!</h2>
                            <hr className="divider" />
                            <p className="text-muted mb-5">Ready to start your next project with us? Send us a messages and we will get back to you as soon as possible!</p>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                        <div className="col-lg-6">
                            <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                                {/*<!-- Submit Button-->*/}
                                <div className="d-grid"><button className="btn btn-primary btn-xl disabled" id="submitButton" type="submit">Submit</button></div>
                            </form>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-4 text-center mb-5 mb-lg-0">
                            <i className="bi-phone fs-2 mb-3 text-muted"></i>
                            <div>+1 (555) 123-4567</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage