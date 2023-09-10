import "./header.css"
import {FaFacebook, FaInstagram} from "react-icons/fa";

import appLogo from "/logo.png"
import {BsArrowUpShort} from "react-icons/bs";

import {scrollToElement} from "../../../utils/scrollToElement.jsx";
import {useEffect} from "react";


function Header ({activeSection}){

    useEffect(() => {
        // Navbar shrink function
        var navbarShrink = function () {
            const navbarCollapsible = document.body.querySelector('#mainNav');
            if (!navbarCollapsible) {
                return;
            }
            if (window.scrollY === 0) {
                navbarCollapsible.classList.remove('navbar-shrink')
            } else {
                navbarCollapsible.classList.add('navbar-shrink')
            }

        };
        // Shrink the navbar
        navbarShrink();
        // Shrink the navbar when page is scrolled
        document.addEventListener('scroll', navbarShrink);


        // Collapse responsive navbar when toggler is visible
        const navbarToggler = document.body.querySelector('.navbar-toggler');
        const responsiveNavItems = [].slice.call(
            document.querySelectorAll('#navbarResponsive .nav-link')
        );
        responsiveNavItems.map(function (responsiveNavItem) {
            responsiveNavItem.addEventListener('click', () => {
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarToggler.click();
                }
            });
        });
    }, []);

    useEffect(() => {
        //apply logo scale and transitions
        const logoTranslate = () => {
            let logo = document.body.querySelector(".logo")
            logo.style.transition = "all 0.3s ease-in-out"

            if(window.scrollY === 0 && window.innerWidth > 991 ) {
                logo.style.transform = `translate(25px,25px) scale(2,2)`;
            } else {
                logo.style.transform = `translate(0px,0px) scale(1, 1)`;
            }
        }
        logoTranslate()
        document.addEventListener('scroll', logoTranslate);
        window.onresize = logoTranslate;
    }, []);

    return (
        <>
            {/*<!-- Navigation-->*/}
            <nav className="navbar navbar-expand-lg navbar-light fixed-top py-1" id="mainNav">
                <div className="container px-4 px-lg-5">
                    <a className="navbar-brand d-flex align-items-center" onClick={() => scrollToElement('page-top')}>
                        <img src={appLogo} width="60" height="60" className="logo d-inline-block align-top" alt="Carvasound"/>
                    </a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <li className="nav-item">
                                <a className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => scrollToElement('about')}>Sobre</a>
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

            <div className="socials position-fixed d-flex flex-column">
                <a className="btn btn-primary btn-circle btn-lg m-1 d-flex justify-content-center align-items-center" href="https://www.instagram.com/carvasound" target="_blank" rel="noreferrer noopener"><FaInstagram/></a>
                <a className="btn btn-primary btn-circle btn-lg m-1 d-flex justify-content-center align-items-center" href="https://www.facebook.com/carvasound" target="_blank" rel="noreferrer noopener"><FaFacebook/></a>
            </div>

            <div className="back-to-top position-fixed d-flex">
                <a className="btn btn-primary btn-circle btn-lg m-1 d-flex justify-content-center align-items-center" onClick={() => scrollToElement('page-top')}><BsArrowUpShort/></a>
            </div>
        </>
    )
}

export default Header