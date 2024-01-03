import "./category.css"
import {FaImages, FaList, FaTable} from "react-icons/fa";

import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";
import {FaX} from "react-icons/fa6";


const Category = () => {
    /*TODO: on parent caller(admin/Gallery.jsx), create useState var for category storing, so its accessible from everywhere, fileupload.jsx inclusive*/

    const {getCategoryList, getCategoryByID} = useAuth();

    const [categoriesList, setCategoriesList] = useState([])

    useEffect(() => {
        (async () => {
            const categories = await getCategoryList();
            setCategoriesList(categories.documents)
        })();
    }, []);

    return (
        <>
            <div className="col-lg-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary"><span><FaList className={"me-1"}></FaList></span> New category</h6>
                        <a href="#" className=" btn btn-success btn-sm text-white">Add</a>
                    </div>
                    <div className="card-body">
                        <div className="row g-1">
                            {categoriesList?.map(category => {
                                return (
                                    <>
                                        <div className="col-auto">
                                            <a className={"btn btn-primary btn-icon-split text-white"}>
                                                <span onClick={() => alert("delete")} className={"icon"}><FaX></FaX></span>
                                                <span className={"text"}>{category.name}</span>
                                            </a>
                                        </div>
                                    </>
                                )
                            })}

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Category