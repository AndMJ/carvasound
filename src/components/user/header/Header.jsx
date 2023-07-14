import "./header.css"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, NavLink, Outlet, useLocation} from "react-router-dom";

import appLogo from "/logo.svg"

//ICONS
import {FaFacebook, FaInstagram} from "react-icons/fa"
import {useEffect, useState} from "react";


function Header (){

    return (
        <>
            <Navbar sticky={"top"} collapseOnSelect={true} expand="lg" className="shadow-sm bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        <img
                            src={appLogo}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Carvasound"
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} className={(isActive) => {isActive ? "active" : ""}} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => {isActive ? "active" : ""}} to="/events">Events</Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => {isActive ? "active" : ""}} to="/gallery">Gallery</Nav.Link>
                            <Nav.Link as={NavLink} className={(isActive) => {isActive ? "active" : ""}} to="/contact">Contact</Nav.Link>

                            {/*<NavDropdown title="Dropdown" id="collasible-nav-dropdown">*/}
                            {/*    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.2">*/}
                            {/*        Another action*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>*/}
                            {/*    <NavDropdown.Divider />*/}
                            {/*    <NavDropdown.Item href="#action/3.4">*/}
                            {/*        Separated link*/}
                            {/*    </NavDropdown.Item>*/}
                            {/*</NavDropdown>*/}
                        </Nav>

                        <Nav>
                            <Nav.Link name={"socials"} href="https://www.instagram.com/carvasound" target="_blank" rel="noreferrer noopener"><FaInstagram/></Nav.Link>
                            <Nav.Link name={"socials"} href="https://www.facebook.com/carvasound" target="_blank" rel="noreferrer noopener"><FaFacebook/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
}

export default Header