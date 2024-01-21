import "./category.css"
import {FaList} from "react-icons/fa";

import {useEffect, useState} from "react";
import {FaArrowRightLong} from "react-icons/fa6";
import {Chip, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress} from "@mui/material";
import Button from "@mui/material/Button";


/*TODO:
   - modal action confirmation on CRUD
   - make modals look "better"
*/
const Category = ({addCategory, updateCategoryByID, categoriesList, deleteCategoryByID, newToastNotif, IsLoadingCategories, setIsLoadingCategories}) => {
    const regex = /^[a-zA-Z0-9àáãâÀÁÃÂèéêÈÉÊìíîÌÍÎòóõôÒÓÕÔùúûÙÚÛ ]*$/

    const [processing, setProcessing] = useState(false)

    const [addCategoryName, setAddCategoryName] = useState("")
    const [editNewCategoryName, setEditNewCategoryName] = useState("")

    const [addModalshown, setAddModalShown] = useState(false)

    const [editModalshown, setEditModalShown] = useState(false)
    const [editCategoryData, setEditCategoryData] = useState([])

    async function handleCategoryAdd() {
        console.log(addCategoryName.length)
        setProcessing(true)
        if(addCategoryName === "" || addCategoryName.length === 0){
            newToastNotif("error", "Name cannot be empty.")
            setProcessing(false)
            return
        }

        if(addCategoryName.length >= 30){
            newToastNotif("error", "Name cannot be larger than 30 letters.")
            setProcessing(false)
            return
        }

        const res = await addCategory({name: addCategoryName})
        console.log(res)
        setProcessing(false)

        if(res.code === (403 || 401)){ //forbidden
            newToastNotif("error", res.message)
            return
        }
        newToastNotif("success", "Created with success.")
        setAddModalShown(false)

    }

    async function handleCategoryUpdate(category_id) {
        setProcessing(true)
        if(editNewCategoryName === "" || editNewCategoryName.length === 0){
            newToastNotif("error", "Name cannot be empty.")
            setProcessing(false)
            return
        }

        if(editNewCategoryName.length >= 30){
            newToastNotif("error", "Name cannot be larger than 30 letters.")
            setProcessing(false)
            return
        }

        const res = await updateCategoryByID(category_id, {name: editNewCategoryName})
        console.log(res)
        setProcessing(false)

        if(res.code === (403 || 401)){ //forbidden
            newToastNotif("error", res.message)
            return
        }
        newToastNotif("success", "Category edited with success.")
        setEditModalShown(false)
    }

    async function handleCategoryDelete(category_id) {
        //console.log(category_id)
        setProcessing(true)
        const res = await deleteCategoryByID(category_id)
        console.log(res)
        setProcessing(false)

        if(res.code === 403){ //forbidden
            newToastNotif("error", res.message)
            return
        }
        newToastNotif("success", "Deleted with success.")
        setAddModalShown(false)
    }

    return (
        <>
            {/*ADD CATEGORY MODAL/DIALOG*/}
            <Dialog
                maxWidth={"xs"}
                TransitionProps={{ onEntered: () => {}, onExited: () => {setAddCategoryName("")} }}
                open={addModalshown}
            >
                <DialogTitle>New Category</DialogTitle>
                <DialogContent > {/*dividers*/}
                    <div className="row g-3">
                        <div className="col-12">
                            <input value={addCategoryName} onChange={(e) => {
                                if (regex.test(e.target.value)) {
                                    setAddCategoryName(e.target.value)
                                }
                            }} type="text" className="form-control" placeholder="New category"/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setAddModalShown(false)}>Cancel</Button>
                    <Button onClick={() => handleCategoryAdd()} disabled={processing} >{processing ? <CircularProgress size={24} color="inherit"  /> : "Add" }</Button>
                </DialogActions>
            </Dialog>

            {/*EDIT CATEGORY MODAL/DIALOG*/}
            <Dialog
                maxWidth={"xs"}
                TransitionProps={{ onEntered: () => {}, onExited: () => {setEditNewCategoryName("")} }}
                open={editModalshown}
            >
                <DialogTitle>Edit Category</DialogTitle>
                <DialogContent > {/*dividers*/}
                    <div className="row g-3">
                        <div className="col-12">
                            <Chip
                                //color={"primary"}
                                label={editCategoryData.name}
                            />
                            <FaArrowRightLong className={"mx-3"}/>
                            <Chip
                                //color={"primary"}
                                label={editNewCategoryName}
                            />
                        </div>

                        <div className="col-12">
                            <input value={editNewCategoryName} onChange={(e) => {
                                if (regex.test(e.target.value)) {
                                    setEditNewCategoryName(e.target.value)
                                }
                            }} type="text" className="form-control" placeholder="New name"/>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditModalShown(false)}>Cancel</Button>
                    <Button onClick={() => handleCategoryUpdate(editCategoryData.$id)} disabled={processing} >{processing ? <CircularProgress size={24} color="inherit" /> : "Save" }</Button>
                </DialogActions>
            </Dialog>

            <>
                <div className="card-header py-3 d-flex justify-content-between align-items-center">
                    <h6 className="m-0 font-weight-bold text-primary"><span><FaList className={"me-1"}></FaList></span> New category</h6>
                    <a onClick={() => setAddModalShown(true)} className="btn btn-success btn-sm text-white">Add</a>
                </div>
                {IsLoadingCategories && <LinearProgress color={"primary"}></LinearProgress>}

                <div className="card-body">
                    <div className="row g-1">
                        {categoriesList?.map((category, index) => {
                            return (
                                <div key={index} className="col-auto">
                                    <Chip
                                        //color={"primary"}
                                        label={category.name}
                                        onClick={() => {
                                            setEditCategoryData(category)
                                            setEditModalShown(true)
                                        }}
                                        onDelete={() => handleCategoryDelete(category.$id)}
                                    />
                                </div>
                            )
                        })}

                    </div>
                </div>

            </>

        </>
    )
}

export default Category