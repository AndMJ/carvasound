import "./header.css"
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import appLogo from "/logo.svg"

//ICONS
import {FaFacebook, FaInstagram} from "react-icons/fa"

function Header (){
    return (
        <>
            <Navbar fixed="top" expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={appLogo}
                            width="60"
                            height="60"
                            className="d-inline-block align-top"
                            alt="Carvasound"
                        />
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/events">Events</Nav.Link>
                            <Nav.Link href="/gallery">Gallery</Nav.Link>
                            <Nav.Link href="/contact">Contact</Nav.Link>

                            {/*<NavDropdown title="Dropdown" id="basic-nav-dropdown">*/}
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
                            <Nav.Link href="https://www.instagram.com/carvasound" target="_blank" rel="noreferrer noopener"><FaInstagram/></Nav.Link>
                            <Nav.Link href="https://www.facebook.com/carvasound" target="_blank" rel="noreferrer noopener"><FaFacebook/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
}

export default Header