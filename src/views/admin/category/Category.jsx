import "./category.css"
import {FaImages, FaTable} from "react-icons/fa";

const Category = () => {
    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <div className=" mb-4"> {/*d-sm-flex align-items-center justify-content-between*/}
                <h1 className="h3 mb-1 text-gray-800">Category</h1>
                <p className="mb-4">Categorize your gallery.</p>
            </div>

            {/*// <!-- Content Row -->*/}
            <div className="row">

                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><span><FaImages className={"me-1"}></FaImages></span> Upload images</h6>
                        </div>
                        <div className="card-body">
                            categ
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><span><FaTable className={"me-1"}></FaTable></span> Gallery table</h6>
                        </div>
                        <div className="card-body gallery-table">
                            table
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Category