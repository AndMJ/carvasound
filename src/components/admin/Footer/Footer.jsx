import "./footer.css"

const Footer = () => {
    return (
        <footer className="sticky-footer bg-white">
            <div className="container my-auto">
                <div className="copyright text-center my-auto">
                    <span>Copyright &copy; Carvasound {new Date().getFullYear()}</span>
                </div>
                <div className="copyright text-center my-auto">
                    <span>Made by <a href="https://github.com/AndMJ" target={"_blank"} rel="noreferrer noopener">AndMJ</a></span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;