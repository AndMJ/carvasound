import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt, FaUpload} from "react-icons/fa";
import {RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useAuth} from "../../utils/authContext.jsx";
import {
    Box,
    CircularProgress,
    Container,
    FormControl, Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack, Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

// ----------------------------------------------------------------------

function Fileupload({newToastNotif, categories}) {
    let _URL = window.URL || window.webkitURL;
    const {addGalleryImages, addStorageImage, getCategoryList} = useAuth();

    const [files, setFiles] = useState([])
    //const [categories, setCategories] = useState([])

    const [uploading, setUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const mappedAcceptedFiles = acceptedFiles.map((file) => ({file, category: undefined}))
        //const mappedRejectedFiles = rejectedFiles.map((file) => ({file, errors: []}))
        setFiles((curr) => [...curr, ...mappedAcceptedFiles, ...rejectedFiles])
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    const imageDimensions = file =>
        new Promise((resolve, reject) => {
            const img = new Image()

            // the following handler will fire after a successful loading of the image
            img.onload = () => {
                const { naturalWidth: width, naturalHeight: height } = img
                resolve({ width, height })
            }

            // and this handler will fire if there was an error with the image (like if it's not really an image or a corrupted one)
            img.onerror = () => {
                reject('There was some problem with the image.')
            }

            img.src = _URL.createObjectURL(file)
        })

    async function handleImageUpload(files) {
        //TODO: - validate errors from appwrite
        //      DONE - on wrong file upload, send notif of error and show what file it was
        for(let fWrapper of files){
            if(!fWrapper.errors){
                setUploading(true)

                const img_dim = await imageDimensions(fWrapper.file)
                console.log(img_dim)

                const img_storage_resp = await addStorageImage(fWrapper.file)
                console.log(img_storage_resp)

                const payload = {
                    image_id: img_storage_resp.$id,
                    width: img_dim.width,
                    height: img_dim.height,
                    category: fWrapper.category
                }

                const resp = await addGalleryImages(JSON.parse(JSON.stringify(payload)))
                console.log(resp)
                
                setUploading(false)

                //newToastNotif("success", "Image uploaded.")
            } else {
                newToastNotif("error", `File "${fWrapper.file.name}" is the wrong file-type and was not uploaded.`)
            }

            handleImageDelete(fWrapper.file)
        }

        newToastNotif("success", "All images uploaded.")

    }

    function handleImageDelete(file){
        setFiles(curr => curr.filter(f => (f.file !== file)))
    }

    const selectAllCategoryRef = useRef(null);
    const selectEachImageListRef = useRef(null);
    const handleSetAllCategory = (e) => {
        let allSelect = selectAllCategoryRef.current //ref to the select "category for all"
        let selectList = selectEachImageListRef.current.querySelectorAll('select'); //get the list of select from the ref wrapper

        for (let select of selectList){
            select.value = allSelect.options[allSelect.selectedIndex].value
        }

        setFiles((currentFiles) =>
            currentFiles.map((currentFile) => {
                //console.log({ ...currentFile, category: e.target.value})
                return { ...currentFile, category: e.target.value};
            })
        );
    }

    const eachImageSelectRef = useRef(null);
    const handleUpdateEachImageCategory = (e, file) => {
        //let select = eachImageSelectRef.current
        console.log(e.target.value)

        setFiles((currentFiles) =>
            currentFiles.map((currentFile) => {
                if (currentFile.file === file) {
                    console.log({ ...currentFile, category: e.target.value})
                    return { ...currentFile, category: e.target.value};
                }
                return currentFile;
            })
        );
    }

    const [updateGalleryCategory, setUpdateGalleryCategory] = useState("null")

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <>
                            <div className={"container-fluid drag-area active"}>
                                <FaArrowUp size={64}></FaArrowUp>
                                <p>Drop the files here ...</p>
                            </div>

                        </>
                        :
                        <>
                            <div className={"container-fluid drag-area"}>
                                <FaImages size={64}></FaImages>
                                <p>Drag & drop some files here, or click to select files</p>
                                <span className="support">Supports: JPEG, JPG, PNG</span>
                            </div>
                        </>
                }
            </div>


            <div className="container-fluid">
                {files.length > 0 &&
                    <>
                        <div className="row my-4 d-flex justify-content-between align-items-center">

                            <div className="col-8 d-flex justify-content-start align-items-center">
                                <button disabled={uploading} className={"d-flex align-items-center btn btn-success text-white"}
                                        onClick={() => {handleImageUpload(files) }}>
                                    <FaUpload className={"me-2"}></FaUpload> {uploading ? "Uploading" : "Upload"}
                                </button>
                            </div>
                            <div className="col-4 d-flex justify-content-end align-items-center">
                                {files.length > 1 &&
                                    <select disabled={uploading} ref={selectAllCategoryRef}
                                            onChange={(e) => {handleSetAllCategory(e) }} defaultValue="null" className="form-select" aria-label="select category">
                                        <option value="null">Sem Categoria</option>
                                        {/*TODO: - validate if there is no categories?? */}
                                        {categories?.map((category, index) => {
                                            return (
                                                <option key={index} value={category.$id}>{category.name}</option>
                                            )
                                        })}
                                    </select>
                                }
                                <button disabled={uploading} className={"d-flex align-items-center btn btn-danger text-white ms-3"}
                                        onClick={() => {setFiles([])}}>
                                    <FaTrashAlt className={"me-2"}></FaTrashAlt> All
                                </button>
                            </div>

                        </div>
                    </>
                }

                <div className="singular-select-wrapper" ref={selectEachImageListRef}>
                    {   //TODO: - send a alert when a file is not supported and remove it from list
                        //      - upload list of files container need style adjusting
                        files?.map((fWrapper, index) => {
                            if (fWrapper.errors?.length > 0){
                            return (
                                <div key={index} className="row d-flex justify-content-between align-items-center text-danger">
                                    <div className="col-auto d-flex justify-content-start align-items-center">
                                        <div className="me-3">
                                            <OverlayTrigger
                                                delay={{ hide: 0, show: 0 }}
                                                overlay={(props) => (
                                                    <Tooltip className={"tooltip-color"} {...props}>
                                                        <span>Wrong file type!</span>
                                                    </Tooltip>
                                                )}
                                                placement="top"
                                            >
                                                <div><RiFileWarningLine size={24}></RiFileWarningLine></div>
                                            </OverlayTrigger>
                                        </div>
                                        <p className={"m-0"}>{fWrapper.file.name}</p>
                                    </div>
                                    <div className="col-auto d-flex justify-content-end align-items-center ms-auto">
                                        <button className={"btn btn-danger text-white"} onClick={() => {handleImageDelete(fWrapper.file)}}><FaTrashAlt></FaTrashAlt></button>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <Fragment key={index}>

                                <div className="row my-4 d-flex justify-content-between text-black"> {/*key={index}*/}
                                    <div className="col-12 col-md-7 d-flex justify-content-start align-items-center">
                                        <div className="image-wrapper">
                                            <img src={_URL.createObjectURL(fWrapper.file)} height={52} alt=""/>
                                        </div>
                                        <div className="ms-3">
                                            <p className={"m-0 " + (uploading && "text-muted")}>{fWrapper.file.name}</p>
                                            {uploading && <CircularProgress size={24} color="primary"/>}
                                        </div>
                                    </div>

                                    <div
                                        className="col-12 col-md-5 d-flex justify-content-end align-items-center flex-shrink-0 pt-2 pt-md-0">
                                        <select disabled={uploading} ref={eachImageSelectRef} onChange={(e) => {handleUpdateEachImageCategory(e, fWrapper.file)}} defaultValue="null" className="form-select" aria-label="select category">
                                            <option value="null">Sem Categoria</option>
                                            {categories?.map((category, index) => {
                                                return (
                                                    <option key={index} value={category.$id}>{category.name}</option>
                                                )
                                            })}
                                        </select>
                                        <button disabled={uploading} className={"btn btn-danger text-white ms-3"}
                                                onClick={() => {
                                                    handleImageDelete(fWrapper.file)
                                                }}
                                        >
                                            <FaTrashAlt></FaTrashAlt>
                                        </button>
                                    </div>
                                </div>

                                <Stack mb={3} spacing={3} direction={{xs: "column", sm: "row"}} alignItems="center" justifyContent="space-between">
                                    <Stack width={"100%"} spacing={2} direction="row" alignItems="center" justifyContent="start">
                                        <Box
                                            component={"img"}
                                            alt={""}
                                            src={_URL.createObjectURL(fWrapper.file)}
                                            sx={{
                                                width: "64px",
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <Typography>{fWrapper.file.name}</Typography>
                                    </Stack>
                                    <Stack width={"100%"} spacing={2} direction="row" alignItems="center" justifyContent="end">
                                        <FormControl fullWidth sx={{minWidth: 200}} size={"small"}>
                                            <InputLabel id="labelCategory">Category</InputLabel>
                                            <Select
                                                labelId="labelCategory"
                                                id="selectCategory"
                                                value={updateGalleryCategory}
                                                label="Category"
                                                onChange={(event) => setUpdateGalleryCategory(event.target.value)}
                                            >
                                                <MenuItem value={"null"}>Sem Categoria</MenuItem>
                                                {categories?.map((category, index) => {
                                                    return (
                                                        <MenuItem key={index} value={category.$id}>{category.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>

                                        <IconButton onClick={() => {}} size={"medium"} color="error"><DeleteIcon/></IconButton>
                                        {/*<Button size={"medium"} color="error">REMOVE</Button>*/}
                                    </Stack>
                                </Stack>


                            </Fragment>
                        )
                        })}
                </div>
            </div>

        </>
    )
}

export default Fileupload;