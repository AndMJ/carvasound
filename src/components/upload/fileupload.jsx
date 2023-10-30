import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt, FaUpload} from "react-icons/fa";
import {RiCheckLine, RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useAuth} from "../../utils/authContext.jsx";
import {CircularProgress, LinearProgress} from "@mui/material";

function Fileupload({newToastNotif}) {
    let _URL = window.URL || window.webkitURL;
    const {addGalleryImages, addStorageImage, getCategoryList} = useAuth();

    const [files, setFiles] = useState([])
    const [categories, setCategories] = useState([])

    const [uploading, setUploading] = useState(false)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        //const mappedAcceptedFiles = acceptedFiles.map((file) => ({file, errors: []}))
        //const mappedRejectedFiles = rejectedFiles.map((file) => ({file, errors: []}))
        setFiles((curr) => [...curr, ...acceptedFiles, ...rejectedFiles])
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    useEffect(() => {
        getCategories()
            .then((response) => {
                setCategories(response)
            })

        return () => {
            setCategories([]);
        };
    }, []);

    const getCategories = async () => {
        const categories = await getCategoryList()
        return categories.documents
    }


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
        //TODO: - add category to images
        //      - validate errors from appwrite
        //      DONE - on wrong file upload, send notif of error and show what file it was
        for(let fileWrapper of files){
            let response
            console.log(fileWrapper)
            if(!fileWrapper.errors){
                setUploading(true)

                /*let img_dim = await imageDimensions(fileWrapper)
                console.log(img_dim)*/

                /*response = await addStorageImage(fileWrapper)
                console.log(response)*/

                /*let payload = {
                    image_id: response.$id,
                    width: img_dim.width,
                    height: img_dim.height,
                    //category_id: ""
                }*/

                /*response = await addGalleryImages(JSON.parse(JSON.stringify(payload)))
                console.log(response)*/
                
                setUploading(false)

                //newToastNotif("success", "Image uploaded.")
                setFiles(curr => curr.filter(f => (f !== fileWrapper)))
            } else {
                newToastNotif("error", `File "${fileWrapper.file.name}" is the wrong file-type and was not uploaded.`)
                setFiles(curr => curr.filter(f => (f !== fileWrapper)))
            }
        }

        newToastNotif("success", "All images uploaded.")

    }

    function handleImageDelete(file){
        setFiles(curr => curr.filter(f => (f !== file)))
    }

    const selectAllCategoryRef = useRef(null);
    const selectEachImageListRef = useRef(null);
    const handleSetAllCategory = (e) => {
        let allSelect = selectAllCategoryRef.current //ref to the select "category for all"
        let selectList = selectEachImageListRef.current.querySelectorAll('select'); //get the list of select from the ref wrapper

        for (let select of selectList){
            select.value = allSelect.options[allSelect.selectedIndex].value
        }
    }

    const eachImageSelectRef = useRef(null);
    const handleUpdateEachImageCategory = (e, file) => {
        //let select = eachImageSelectRef.current
        console.log(e.target.value)

        setFiles((curr) => {
            curr.map((fw) => {
                if (fw.file === file.file) {
                    console.log(file)
                    return { ...fw, category_id: e.target.value};
                }
                return fw;
            })
        })
    }
    console.log(files)

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
                            <div className="col-auto d-flex justify-content-start align-items-center">
                                <button disabled={uploading} className={"d-flex align-items-center btn btn-success text-white"} onClick={() => {handleImageUpload(files)}}>
                                    <FaUpload className={"me-2"}></FaUpload> {uploading ? "Uploading" : "Upload" }
                                </button>
                            </div>
                            <div className="col-auto d-flex justify-content-end align-items-center ms-auto">
                                <select disabled={uploading} ref={selectAllCategoryRef} onChange={(e) => {handleSetAllCategory(e)}} defaultValue="placeholder" className="form-select" aria-label="select category">
                                    <option value="placeholder" disabled>Select category</option>
                                    {/*TODO: - validate if there is no categories, do something*/}
                                    {categories?.map((category, index) => {
                                        return (
                                            <option key={index} value={category.$id}>{category.name}</option>
                                        )
                                    })}
                                </select>
                                <button disabled={uploading} className={"d-flex align-items-center btn btn-danger text-white ms-3"} onClick={() => {setFiles([])}}><FaTrashAlt className={"me-2"}></FaTrashAlt> All</button>
                            </div>
                        </div>
                    </>
                }

                <div className="singular-select-wrapper" ref={selectEachImageListRef}>
                    {   //TODO: - send a alert when a file is not supported and remove it from list
                        //      - upload list of files container need adjusting
                        files?.map((file, index) => {
                        if (file.errors?.length > 0){
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
                                        <p className={"m-0"}>{file.file.name}</p>
                                    </div>
                                    <div className="col-auto d-flex justify-content-end align-items-center ms-auto">
                                        <button className={"btn btn-danger text-white"} onClick={() => {handleImageDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <div key={index} className="row my-3 d-flex justify-content-between text-black">
                                <div className="col-auto d-flex justify-content-start align-items-center">
                                    <div className="image-wrapper">
                                        <img src={_URL.createObjectURL(file)} height={52} alt=""/>
                                    </div>
                                    <div className="ms-3">
                                        <p className={"m-0 " + (uploading && "text-muted")}>{file.name}</p>
                                        {uploading && <CircularProgress size={24} color="primary" /> }
                                    </div>
                                </div>

                                <div className="col-auto d-flex justify-content-end align-items-center flex-shrink-0">
                                    <select disabled={uploading} ref={eachImageSelectRef} onChange={(e) => {handleUpdateEachImageCategory(e, file)}} defaultValue="placeholder" className="form-select" aria-label="select category">
                                        <option value="placeholder" disabled>Select category</option>
                                        {categories?.map((category, index) => {
                                            return (
                                                <option key={index} value={category.$id}>{category.name}</option>
                                            )
                                        })}
                                    </select>
                                    <button disabled={uploading} className={"btn btn-danger text-white ms-3"} onClick={() => {handleImageDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}

export default Fileupload;