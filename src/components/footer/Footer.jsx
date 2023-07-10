import "./footer.css"
import {Container} from "react-bootstrap";

//TODO: fix footer position and make it hidden when on home page

function Footer(){
    return(
        <Container>
            <footer className="py-3 my-4">
                <p className="text-center text-muted">&copy; {new Date().getFullYear()} Carvasound - Made by <a href="https://github.com/AndMJ">AndMJ</a></p>
            </footer>
        </Container>
    )
}

export default Footer;