import "./footer.css"


function Footer(){
    return(
        <>
            {/*<!-- Footer-->*/}
            <footer className="bg-light py-5">
                <div className="container px-4 px-lg-5">
                    <div className="small text-center text-muted">
                        Copyright &copy; {new Date().getFullYear()} Carvasound - Made by <a href="https://github.com/AndMJ" target={"_blank"} rel="noreferrer noopener">AndMJ</a>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;