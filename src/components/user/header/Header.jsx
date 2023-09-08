import "./header.css"
import {FaFacebook, FaInstagram} from "react-icons/fa";

import appLogo from "/logo.png"


function Header ({activeSection}){

    function scrollToElement(elementId) {
        const element = document.getElementById(elementId);

        if (element) {
            // Calculate the vertical position of the element
            const offsetTop = element.getBoundingClientRect().top + window.scrollY;

            // Scroll to the element's position
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth', // Add smooth scrolling for a smoother animation
            });
        }
    }


    return (
        <>
            {/*<!-- Navigation-->*/}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-1" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand d-flex align-items-center" onClick={() => scrollToElement('page-top')}>
                        <img src={appLogo} width="60" height="60" className="d-inline-block align-top" alt="Carvasound"/>
                    </a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToElement('about')}>About</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'services' ? 'active' : ''}`} onClick={() => scrollToElement('services')}>Eventos</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`} onClick={() => scrollToElement('portfolio')}>Galeria</a>
                            </li>
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => scrollToElement('contact')}>Contactos</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="socials position-fixed d-flex">
                <a className="btn btn-primary btn-circle btn-lg m-1 d-flex justify-content-center align-items-center" href="https://www.instagram.com/carvasound" target="_blank" rel="noreferrer noopener"><FaInstagram/></a>
                <a className="btn btn-primary btn-circle btn-lg m-1 d-flex justify-content-center align-items-center" href="https://www.facebook.com/carvasound" target="_blank" rel="noreferrer noopener"><FaFacebook/></a>
            </div>
        </>
    )
}

export default Header