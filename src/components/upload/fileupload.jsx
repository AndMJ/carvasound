import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt} from "react-icons/fa";
import {RiCheckLine, RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Fileupload() {
    const [files, setFiles] = useState([])
    console.log(files)

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
                            <div className={"container drag-area active"}>
                                <FaArrowUp size={64}></FaArrowUp>
                                <p>Drop the files here ...</p>
                            </div>

                        </>
                        :
                        <>
                            <div className={"container drag-area"}>
                                <FaImages size={64}></FaImages>
                                <p>Drag & drop some files here, or click to select files</p>
                            </div>
                        </>
                }
            </div>

            <ul className="list-group">
                {files?.map((file, index) => {
                    if (file.errors?.length > 0){
                        return (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center text-danger">
                                <div className="d-flex justify-content-start align-items-center">
                                    <div className="me-3">
                                        <OverlayTrigger
                                            delay={{ hide: 0, show: 0 }}
                                            overlay={(props) => (
                                                <Tooltip className={"tooltip-color"} {...props}>
                                                    <span className={"text-danger"}>Wrong file type!</span>
                                                </Tooltip>
                                            )}
                                            placement="top"
                                        >
                                            <div><RiFileWarningLine size={24}></RiFileWarningLine></div>
                                        </OverlayTrigger>
                                    </div>
                                    <p className={"m-0"}>{file.file.name}</p>
                                </div>
                                <button className={"btn btn-danger"} onClick={() => {handleDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                            </li>
                        )
                    }
                    return (
                        <li key={index} className="list-group-item d-flex justify-content-between text-success">
                            <div className="d-flex justify-content-start align-items-center">
                                <div className="me-3">
                                    <RiCheckLine size={24}></RiCheckLine>
                                </div>
                                <img src={URL.createObjectURL(file)} width={90} height={90}/>
                                <div className="ms-3">
                                    <p className={"m-0"}>{file.name}</p>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end align-items-center">
                                <select className="form-select" aria-label="Default select example">
                                    <option selected disabled>Category</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                                <button className={"btn btn-danger ms-3"} onClick={() => {handleDelete(file)}}><FaTrashAlt></FaTrashAlt></button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Fileupload;