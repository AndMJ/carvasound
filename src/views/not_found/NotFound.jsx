import "./notFound.css"

// import('bootstrap/dist/css/bootstrap.min.css')
import {FaArrowLeft} from "react-icons/fa";
import {Link} from "react-router-dom";

//assets
import image404 from "../../assets/img/not_found/page-not-found.png"

function PageNotFound (){
    const handleClick = (e) => {
        e.preventDefault()
        history.back()
    }

    return (
        <>
            <section className={"page404"}>
                <div className="container">
                    <div className="row text-center pt-5">
                        <div className="col-sm-12">
                            <img src={image404} className={"fluid"} alt={"404 not found"}/>
                        </div>
                        <div className="col-sm-12 py-5">
                            <p className="lead">Pagina não foi encontrada no servidor.</p>
                            <Link to={"/"} className={"btn btn-primary"} onClick={handleClick}><FaArrowLeft/> Voltar</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PageNotFound;