import "./Loader.css"
import React from "react";
// React.lazy(()=> import('bootstrap/dist/css/bootstrap.min.css'))


const Loader = () => {
    return (
        <>
            <div className="loader-spinner spinner-border position-absolute top-50 start-50" role="status"></div>
        </>
    )
}

export default Loader;