import "./footer.css"

const Footer = () => {
    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Carvasound {new Date().getFullYear()}</div>
                    <div>
                        Made by <a href="https://github.com/AndMJ" target={"_blank"} rel="noreferrer noopener">AndMJ</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;