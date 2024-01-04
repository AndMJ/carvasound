import "./category.css"
import {FaImages, FaList, FaTable} from "react-icons/fa";

import {useEffect, useState} from "react";
import {FaX} from "react-icons/fa6";


const Category = ({addCategory, categoriesList, deleteCategoryByID}) => {
    const [catName, setCatName] = useState("")

    async function handleCategoryAdd() {
        const res = await addCategory({name: catName})
        console.log(res)
    }

    async function handleCategoryDelete(category_id) {
        console.log(category_id)
        const res = await deleteCategoryByID(category_id)
    }

    return (
        <>
            <div className="col-lg-4">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between align-items-center">
                        <h6 className="m-0 font-weight-bold text-primary"><span><FaList className={"me-1"}></FaList></span> New category</h6>
                        <a onClick={() => handleCategoryAdd()} className="btn btn-success btn-sm text-white">Add</a>
                        <input onChange={(e) => setCatName(e.target.value)} value={catName}/>
                    </div>
                    <div className="card-body">
                        <div className="row g-1">
                            {categoriesList?.map((category, index) => {
                                return (
                                    <div key={index} className="col-auto">
                                        <a className={"btn btn-primary btn-icon-split text-white"}>
                                            <span onClick={() => handleCategoryDelete(category.$id)} className={"icon"}><FaX></FaX></span>
                                            <span className={"text"}>{category.name}</span>
                                        </a>
                                    </div>
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