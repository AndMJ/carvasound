import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt, FaUpload} from "react-icons/fa";
import {RiCheckLine, RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useAuth} from "../../utils/authContext.jsx";
import {CircularProgress} from "@mui/material";
import {useOutletContext} from "react-router-dom";

function Fileupload({newToastNotif}) {
    const {addGalleryImages, addStorageImage} = useAuth();

    const [files, setFiles] = useState([])

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


    async function handleImageUpload(files) {
        //TODO: - add category to images
        //TODO: - validate errors from appwrite
        for(let file_image of files){
            let response
            console.log(file_image)
            if(!file_image.errors){
                setUploading(true)

                response = await addStorageImage(file_image)
                console.log(response)

                let payload = {
                    image_id: response.$id,
                    //category_id: ""
                }

                response = await addGalleryImages(JSON.parse(JSON.stringify(payload)))
                console.log(response)

                setUploading(false)

                setFiles(curr => curr.filter(f => (f !== file_image)))
            } else {
                response = "Wrong file type"
                console.log(response)
                setFiles(curr => curr.filter(f => (f !== file_image)))
            }
        }

        newToastNotif("success", "All images uploaded.")

    }

    function handleDelete(file){
        setFiles(curr => curr.filter(f => (f !== file)))
    }

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
                                <button className={"d-flex align-items-center btn btn-success text-white"} onClick={() => {handleImageUpload(files)}}><FaUpload className={"me-2"}></FaUpload> Upload</button>
                            </div>
                            <div className="col-auto d-flex justify-content-end align-items-center ms-auto">
                                <select defaultValue="placeholder" className="form-select" aria-label="select category">
                                    <option value="placeholder" disabled>Select category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <button className={"d-flex align-items-center btn btn-danger text-white ms-3"} onClick={() => {setFiles([])}}><FaTrashAlt className={"me-2"}></FaTrashAlt> All</button>
                            </div>
                        </div>
                    </>
                }


                {   //TODO: send a alert when a file is not supported and remove it from list
                    //      list of upload container columns need adjusting
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
                                    <button className={"btn btn-danger text-white"} onClick={() => {handleDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={index} className="row my-3 d-flex justify-content-between text-black">
                            <div className="col-auto d-flex justify-content-start align-items-center">
                                <div className="me-3">
                                    {uploading ?
                                        <span className={"text-muted"}><CircularProgress size={24} color="inherit" /></span>
                                        :
                                        ""
                                        /*<span className={"text-success"}><RiCheckLine size={24}></RiCheckLine></span>*/
                                    }

                                </div>
                                <img src={URL.createObjectURL(file)} height={52} alt=""/>
                                <div className="ms-3">
                                    <p className={"m-0"}>{file.name}</p>
                                </div>
                            </div>

                            <div className="col-auto d-flex justify-content-end align-items-center flex-shrink-0">
                                <select defaultValue="placeholder" className="form-select" aria-label="select category">
                                    <option value="placeholder" disabled>Select category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <button className={"btn btn-danger text-white ms-3"} onClick={() => {handleDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default Fileupload;