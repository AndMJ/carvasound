import "./landingPage.css"

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
                            <h1 className="text-white font-weight-bold">Lorem ipsum dolor sit amet, consectetur</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Ipsum dolor sit amet consectetur adipiscing elit. Diam quis enim vel eros donec ac. Cras adipiscing enim eu turpis egestas.</p>
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
                            <h2 className="text-white mt-0">Vitae suscipit tellus mauris a diam maecenas</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">
                                Quam pellentesque nec nam aliquam sem et tortor. Malesuada fames ac turpis egestas maecenas pharetra convallis.
                                Id consectetur purus ut faucibus pulvinar elementum integer. Sed velit dignissim sodales ut eu sem integer. Egestas sit amet cursus sit amet dictum.
                            </p>
                            <p className="text-white-75 mb-4">
                                Id faucibus nisl tincidunt eget nullam non. Volutpat diam ut venenatis tellus in metus vulputate. Felis donec et odio pellentesque diam.
                                Aliquam faucibus purus in massa tempor nec. Eget mauris pharetra et ultrices neque. Massa placerat duis ultricies lacus sed turpis tincidunt id aliquet.
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

            {/*<!-- Gallery-->*/}
            <section className="page-section" id="gallery" ref={sectionRefs.gallery}> {/*bg-dark text-white*/}
                <div className="container px-4 px-lg-5 text-center">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6 text-center">
                            <h2 className="mt-0">Galeria</h2>
                            <hr className="divider" />
                            <p className="text-muted mb-5">Volutpat tincidunt vitae semper!</p>
                        </div>
                    </div>

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
                            <p className="text-muted mb-5">Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare.</p>
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
                                    <textarea className="form-control" id="message" style={{height: "10rem", maxHeight: "15rem"}} placeholder="Mensagem..." required></textarea>
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