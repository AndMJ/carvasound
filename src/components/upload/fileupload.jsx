import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt, FaUpload} from "react-icons/fa";
import {RiCheckLine, RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useAuth} from "../../utils/authContext.jsx";
import {isReturningOnlyNull} from "eslint-plugin-react/lib/util/jsx.js";

function Fileupload() {
    const {addGalleryImages, addStorageImage} = useAuth();

    const [files, setFiles] = useState([])

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

//TODO: - add category to images
    async function handleImageUpload(files) {
        let payload = {
            image_id: ""
        }

        for(let file_image of files){
            let response
            if(!file_image.errors){
                response = await addStorageImage(file_image)
                payload.image_id = response.$id
                console.log(response)
                response = await addGalleryImages(JSON.parse(JSON.stringify(payload)))
                console.log(response)
            } else {
                response = "Wrong file type"
                console.log(response)
            }
        }
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
                                <button className={"d-flex align-items-center btn btn-success"} onClick={() => {handleImageUpload(files)}}><FaUpload className={"me-2"}></FaUpload> Upload</button>
                            </div>
                            <div className="col-auto d-flex justify-content-end align-items-center ms-auto">
                                <select defaultValue="placeholder" className="form-select" aria-label="select category">
                                    <option value="placeholder" disabled>Select category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <button className={"d-flex align-items-center btn btn-danger ms-3"} onClick={() => {setFiles([])}}><FaTrashAlt className={"me-2"}></FaTrashAlt> All</button>
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
                                    <button className={"btn btn-danger"} onClick={() => {handleDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div key={index} className="row my-3 d-flex justify-content-between text-success">
                            <div className="col-auto d-flex justify-content-start align-items-center">
                                <div className="me-3">
                                    <RiCheckLine size={24}></RiCheckLine>
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
                                <button className={"btn btn-danger ms-3"} onClick={() => {handleDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                            </div>
                        </div>
                    )
                })}
            </div>

        </>
    )
}

export default Fileupload;