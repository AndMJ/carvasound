import "./Loader.css"

const Loader = () => {
    return (
        <>
            <div className="loader-spinner spinner-border position-absolute top-50 start-50" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </>
    )
}

export default Loader;