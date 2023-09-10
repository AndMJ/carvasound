import "./landingPage.css"
import eventImage_casamento from "../../../assets/img/events/casamento.jpg"
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";

import {TbCross} from "react-icons/tb";
import {LuCake, LuPartyPopper} from "react-icons/lu";
import {MdOutlineBusinessCenter, MdOutlineMail, MdOutlineMoreHoriz, MdOutlinePhoneIphone} from "react-icons/md";
import {RiHeartsLine} from "react-icons/ri";

import {scrollToElement} from "../../../utils/scrollToElement.jsx";
import GalleryBox from "../gallery/Gallery.jsx";

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
                            <h1 className="text-white font-weight-bold">Carvasound, Som para todas as ocasiões</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Cuidamos da parte técnica para que tenha um bom momento. Com som profissional e uma presença contagiante, terá uma experiência única.</p>
                            <a className="btn btn-primary btn-xl" onClick={() => scrollToElement('about')}>Ver Mais</a>
                        </div>
                    </div>
                </div>
            </header>
            {/*<!-- About-->*/}
            <section className="page-section  bg-dark" id="about" ref={sectionRefs.about}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">DJ Profissional para Eventos Inesquecíveis.</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">
                                Especializados em eventos, nossa missão é criar experiências musicais inesquecíveis para cada ocasião.
                                Com anos de experiência e um vasto repertório musical, trazemos vida e energia a casamentos, festas de aniversário, batizados, eventos corporativos e muito mais.
                            </p>
                            <p className="text-white-75 mb-4">
                                Conosco consegue esolher a trilha sonora perfeita, garantindo que sua celebração seja única, emocionante e repleta de momentos especiais.
                                Deixe-nos transformar sua festa em um espetáculo musical que você e seus convidados lembrarão com carinho por anos a fio.
                            </p>
                            <a className="btn btn-light btn-xl" onClick={() => scrollToElement('services')}>Ver Eventos</a>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Services-->*/}
            <section className="page-section" id="services" ref={sectionRefs.services}>
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Eventos</h2>
                    <hr className="divider" />
                    <div className="row gx-4 gx-lg-5 ">
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><RiHeartsLine className={"fs-1 text-primary"}/></div>
                                <h3 className="h4 mb-2">Casamentos</h3>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><TbCross className={"fs-1 text-primary"}/></div>
                                <h3 className="h4 mb-2">Batizados</h3>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><LuCake className="fs-1 text-primary"/></div>
                                <h3 className="h4 mb-2">Aniversários</h3>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><LuPartyPopper className="fs-1 text-primary"/></div>
                                <h3 className="h4 mb-2">Festas Temáticas</h3>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><MdOutlineBusinessCenter className="fs-1 text-primary"/></div>
                                <h3 className="h4 mb-2">Eventos Corporativos</h3>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 text-center">
                            <div className="mt-5">
                                <div className="mb-2"><MdOutlineMoreHoriz className="fs-1 text-primary"/></div>
                                <h3 className="h4 mb-2">Outros</h3>
                                <p className="text-muted mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*<!-- Portfolio-->*/}
            {/*<section id="portfolio">
                <div className="container-fluid p-0">
                    <div className="row g-0">
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Casamentos</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Batizados</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Aniversários</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Festas Temáticas</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption">
                                    <div className="project-category text-white-50">Eventos Corporativos</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <a className="portfolio-box" href={eventImage_casamento} title="Project Name">
                                <img className="img-fluid" src={eventImage_casamento} alt="..." />
                                <div className="portfolio-box-caption p-3">
                                    <div className="project-category text-white-50">Outros</div>
                                    <div className="project-name">Project Name</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </section>*/}
            {/*<!-- Call to action-->*/}
            <section id="gallery" className="page-section " ref={sectionRefs.gallery}> {/*bg-dark text-white*/}
                <div className="container px-4 px-lg-5 text-center">
                    <h2 className="mb-4">Veja a nossa coleção de eventos!</h2>
                    <a className="btn btn-primary btn-md" onClick={() => {alert("Todas")}}>Todas</a>
                    <a className="btn btn-primary btn-md mx-3" onClick={() => {alert("Casamentos")}}>Casamentos</a>
                    <a className="btn btn-primary btn-md" onClick={() => {alert("Batizados")}}>Batizados</a>

                    <GalleryBox></GalleryBox>
                </div>
            </section>
            {/*<!-- Contact-->*/}
            <section className="page-section" id="contact" ref={sectionRefs.contact}>
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6 text-center">
                            <h2 className="mt-0">Contactos</h2>
                            <hr className="divider" />
                            <p className="text-muted mb-5">Entre em contato conosco agora e vamos juntos dar vida à sua festa!</p>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
                        <div className="col-lg-6">
                            <form id="contactForm" method={"POST"}>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="name" type="text" placeholder="Enter your name..." required />
                                    <label htmlFor="name">Nome</label>
                                    <div className="invalid-feedback" >erro</div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="email" type="email" placeholder="exemplo@email.com" required />
                                    <label htmlFor="email">Email</label>
                                    <div className="invalid-feedback" >erro</div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="phone" type="tel" placeholder="912 345 678" minLength={9} maxLength={16} required />
                                    <label htmlFor="phone">Telemóvel</label>
                                    <div className="invalid-feedback" >erro</div>
                                </div>

                                <div className="form-floating mb-3">
                                    <input className="form-control" id="subject" type="text" placeholder="Assunto" required />
                                    <label htmlFor="subject">Assunto</label>
                                    <div className="invalid-feedback" >erro</div>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea className="form-control" id="message" style={{height: "10rem"}} placeholder="Mensagem..." required></textarea>
                                    <label htmlFor="message">Mensagem</label>
                                    <div className="invalid-feedback" >erro</div>
                                </div>

                                <div className="d-grid">
                                    <button className="btn btn-primary btn-xl" id="submitButton" type="submit">Enviar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-4 text-center mb-5 mb-lg-0">
                            <MdOutlinePhoneIphone className={"fs-2 mb-3 text-muted"}></MdOutlinePhoneIphone>
                            <div><a href={"tel:+351967208626"}>+351 967 208 626</a></div>
                        </div>
                        <div className="col-lg-4 text-center mb-5 mb-lg-0">
                            <MdOutlineMail className={"fs-2 mb-3 text-muted"}></MdOutlineMail>
                            <div><a href={"mailto:geral_carvasound@hotmail.com"}>geral_carvasound@hotmail.com</a></div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default LandingPage