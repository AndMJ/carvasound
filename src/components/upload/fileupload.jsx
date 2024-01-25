import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt} from "react-icons/fa";
import {RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import {useAuth} from "../../utils/authContext.jsx";
import {
    Box,
    Container, createTheme,
    FormControl, Grid,
    IconButton,
    InputLabel, LinearProgress,
    MenuItem,
    Select,
    Stack, Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from '@mui/icons-material/Upload';
import {AnimatePresence, motion, usePresence} from "framer-motion"

// ----------------------------------------------------------------------

function Fileupload({newToastNotif, categories}) {
    let _URL = window.URL || window.webkitURL;
    const {addGalleryImages, addStorageImage, getCategoryList} = useAuth();

    const [files, setFiles] = useState([])
    //console.log(files)

    const [uploading, setUploading] = useState(false)
    const [selectChangeAll_Value, setSelectChangeAll_Value] = useState("placeholder")

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const mappedAcceptedFiles = acceptedFiles.map( (file) => ({
            file,
            category: "null",
            preview: _URL.createObjectURL(file)
        }))
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
                const {naturalWidth: width, naturalHeight: height} = img
                resolve({width, height})
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
        //      - implement a total in array because of DB 60 querys limit
        for (let fWrapper of files) {
            if (!fWrapper.errors) {
                setUploading(true)

                const img_dim = await imageDimensions(fWrapper.file)
                console.log(img_dim)

                const img_storage_resp = await addStorageImage(fWrapper.file)
                //console.log(img_storage_resp)

                const payload = {
                    image_id: img_storage_resp.$id,
                    width: img_dim.width,
                    height: img_dim.height,
                    category: fWrapper.category
                }

                const resp = await addGalleryImages(JSON.parse(JSON.stringify(payload)))
                //console.log(resp)

                setUploading(false)

                //newToastNotif("success", "Image uploaded.")
            } else {
                newToastNotif("error", `File "${fWrapper.file.name}" is the wrong file-type and was not uploaded.`)
            }

            handleImageDelete(fWrapper.file)
        }

        newToastNotif("success", "All images uploaded.")

    }

    const handleClearFileArray = () => {
        setFiles([])
        setSelectChangeAll_Value("placeholder")
    }

    function handleImageDelete(file) {
        setFiles(curr => curr.filter(f => (f.file !== file)))
    }

    const handleSelectChange = (event, file) => {
        setFiles((currentFileArray) =>
            currentFileArray.map((fWrapper) => {
                if (fWrapper.file === file) {
                    //console.log({ ...fWrapper, category: event.target.value})
                    return {...fWrapper, category: event.target.value};
                }
                return fWrapper;
            })
        );

        const res = new Set(files.map(item => item.category)).size === 1
        console.log("all equal?", res)

        if (res) {
            setSelectChangeAll_Value("placeholder")
        }
    }

    const handleSelectChangeAll = (event) => {
        setSelectChangeAll_Value(event.target.value)

        if (event.target.value !== "placeholder") {
            setFiles((currentFileArray) =>
                currentFileArray.map((fWrapper) => {
                    console.log({...fWrapper, category: event.target.value})
                    return {...fWrapper, category: event.target.value};
                })
            );
        }
    }

    return (
        <>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    !uploading && (
                        isDragActive ?
                            <>
                                <Box className={"drag-area active"}>
                                    <FaArrowUp size={64}></FaArrowUp>
                                    <p>Drop the files here ...</p>
                                </Box>
                            </>
                            :
                            <>
                                <Box className={"drag-area"}>
                                    <FaImages size={64}></FaImages>
                                    <p>Drag & drop, or click to select files</p>
                                    <span className="support">Supports: JPEG, JPG, PNG</span>
                                </Box>
                            </>
                    )

                }
            </div>


            <Container disableGutters>
                {files.length > 0 &&
                    <Stack hidden={uploading} width={"100%"} my={3} spacing={2} direction={"row"}
                           alignContent={"center"} justifyContent={"start"}>
                        <Button sx={{flexShrink: 0}} size={"medium"} color={"success"} variant={"contained"}
                                startIcon={<UploadIcon/>}
                                onClick={() => {
                                    handleImageUpload(files)
                                }}
                        >
                            Upload
                        </Button>
                        <Button sx={{flexShrink: 0}} size={"medium"} color={"error"} variant={"contained"}
                                startIcon={<DeleteIcon/>}
                                onClick={() => {
                                    handleClearFileArray()
                                }}
                        >
                            Cancel
                        </Button>
                        {files.length > 1 &&
                            <FormControl fullWidth sx={{minWidth: 200, maxWidth: 300}} size={"small"}>
                                <InputLabel id="labelCategory">Category</InputLabel>
                                <Select
                                    labelId="labelCategory"
                                    id="selectCategory"
                                    value={selectChangeAll_Value}
                                    label="Category"
                                    onChange={(event) => handleSelectChangeAll(event)}
                                >
                                    <MenuItem disabled placeholder value={"placeholder"}>Categorizar
                                        todos</MenuItem>
                                    <MenuItem value={"null"}>Sem Categoria</MenuItem>
                                    {categories?.map((category, index) => {
                                        return (
                                            <MenuItem key={index} value={category.$id}>{category.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        }
                    </Stack>
                }

                {/*TODO: send a alert when a file is not supported and remove it from list
                         upload list of files container need style adjusting

                 */}

                {/*<AnimatePresence mode={'popLayout'}>*/}
                {
                    files?.map((fWrapper, index) => {
                        if (fWrapper.errors?.length > 0) {
                            return (
                                <div key={index}
                                     className="row d-flex justify-content-between align-items-center text-danger">
                                    <div className="col-auto d-flex justify-content-start align-items-center">
                                        <div className="me-3">
                                            <OverlayTrigger
                                                delay={{hide: 0, show: 0}}
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
                                    <div
                                        className="col-auto d-flex justify-content-end align-items-center ms-auto">
                                        <button className={"btn btn-danger text-white"} onClick={() => {
                                            handleImageDelete(fWrapper.file)
                                        }}><FaTrashAlt></FaTrashAlt></button>
                                    </div>
                                </div>
                            )
                        }
                        return (
                            <motion.div
                                key={index*485689}
                                layout
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 50 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 50, mass: 1 }}
                            >
                                <Stack key={index} mb={3} spacing={3} direction={{xs: "column", sm: "row"}} alignItems="center" justifyContent="space-between">
                                <Stack width={"100%"} spacing={2} direction="row" alignItems="center"
                                       justifyContent="start">
                                    <Box sx={{
                                        minWidth: 100,
                                        minHeight: 100,
                                        width: 100,
                                        height: 100,
                                    }}>
                                        <Box
                                            component={"img"}
                                            alt={""}
                                            src={fWrapper.preview}
                                            sx={{
                                                borderRadius: 0.8,
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </Box>

                                    <Stack width={"100%"} spacing={2} direction="column"
                                           justifyContent="start">
                                        <Typography
                                            sx={{fontSize: "0.9rem"}}>{fWrapper.file.name}</Typography>
                                        <Stack width={"100%"} spacing={2} direction="row"
                                               alignItems="center"
                                               justifyContent="start">
                                            <FormControl hidden={uploading} fullWidth
                                                         sx={{minWidth: 200, maxWidth: 300}} size={"small"}>
                                                <InputLabel id="labelCategory">Category</InputLabel>
                                                <Select
                                                    labelId="labelCategory"
                                                    id="selectCategory"
                                                    value={fWrapper.category}
                                                    label="Category"
                                                    onChange={(event) => handleSelectChange(event, fWrapper.file)}
                                                >
                                                    <MenuItem value={"null"}>Sem Categoria</MenuItem>
                                                    {categories?.map((category, index) => {
                                                        return (
                                                            <MenuItem key={index}
                                                                      value={category.$id}>{category.name}</MenuItem>
                                                        )
                                                    })}
                                                </Select>
                                            </FormControl>

                                            <Button hidden={uploading} sx={{flexShrink: 0}} size={"small"}
                                                    variant="contained" color="error" onClick={() => {
                                                handleImageDelete(fWrapper.file)
                                            }}>REMOVE</Button>

                                            <Box hidden={!uploading} sx={{width: '100%'}}>
                                                <LinearProgress/>
                                            </Box>
                                        </Stack>
                                    </Stack>

                                </Stack>
                            </Stack>
                            </motion.div>
                        );
                    })
                }
                {/*</AnimatePresence>*/}
            </Container>
        </>
)
}

export default Fileupload;