import "./footer.css"
import {useLocation} from "react-router-dom";

function Footer(){
    const location = useLocation();

    return(
        <footer className="p-2 bottom-0 start-50 translate-middle-x">
            <p className={(location.pathname === '/') ? 'text-center text-white' : 'text-center text-muted'}> Copyright &copy; {new Date().getFullYear()} Carvasound - Made by <a href="https://github.com/AndMJ" target={"_blank"} rel="noreferrer noopener">AndMJ</a></p>
        </footer>
    )
}

export default Footer;