import "bootstrap/dist/css/bootstrap.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Loader.css"

const Loader = () => {
    return (
        <>
            <div className={"vw-100 vh-100"}>
                <div className="loader-spinner spinner-border position-absolute top-50 start-50" role="status"></div>
            </div>
        </>
    )
}

export default Loader;