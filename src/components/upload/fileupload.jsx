import "./fileupload.css"

import {useDropzone} from 'react-dropzone'
import {Fragment, useCallback, useEffect, useRef, useState} from "react";
import {FaArrowUp, FaImages, FaTrashAlt} from "react-icons/fa";
import {RiFileWarningLine} from "react-icons/ri";

import Tooltip from 'react-bootstrap/Tooltip';
import {useAuth} from "../../utils/authContext.jsx";
import {
    Box, CardContent, CardMedia,
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
import {Card} from "react-bootstrap";
import WarningIcon from '@mui/icons-material/Warning';

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

        //notify all rejected files
        const mappedRejectedFiles = rejectedFiles.map((file) => ({file, errors: []}))
        mappedRejectedFiles.map((current) => {
            newToastNotif("error", `File "${current.file.file.name}" is the wrong file-type.`)
        })

        setFiles((curr) => [...curr, ...mappedAcceptedFiles, /*...rejectedFiles*/])
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

    function handleImageDelete(file) {
        setFiles(curr => curr.filter(f => (f.file !== file)))
    }

    const handleClearFileArray = () => {
        setFiles([])
        setSelectChangeAll_Value("placeholder")
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
        <Container disableGutters>
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



            {files.length > 0 &&
                <Stack hidden={uploading} my={3} spacing={2} direction={"row"}
                       alignItems={"center"} justifyContent={"center"}>
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
                        <FormControl sx={{ maxWidth: 300}} size={"small"}>
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

            {/*TODO: - upload list of files container need style adjusting

             */}

            <Grid container spacing={3} sx={{ marginTop: 'unset', marginLeft: 'unset', width: '100%' }}>
                {files?.map((fWrapper, index) => (
                    <Grid key={index} item xs={12} sm={6} md={4} lg={4} xl={6}>
                        <Stack my={2} direction={'row'} alignItems="center" justifyContent="space-between" flexWrap={'wrap'}>
                            <Box mb={2} sx={{ minWidth: 100, minHeight: 100, width: '100%', height: '100%' }}>
                                <Box
                                    component={'img'}
                                    alt={''}
                                    src={fWrapper.preview}
                                    sx={{
                                        borderRadius: 0.8,
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                    }}
                                />
                            </Box>
                            <Typography
                                mb={2}
                                flexShrink={1}
                                sx={{
                                    fontSize: '0.9rem',
                                    overflow: 'hidden',
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2, // Number of lines to show before truncating
                                    wordBreak: 'break-word',
                                }}
                            >
                                {fWrapper.file.name}
                            </Typography>
                            <Stack width={"100%"} spacing={2} direction="column" alignItems="center" justifyContent="end">
                                <FormControl fullWidth hidden={uploading} sx={{ /*maxWidth: 300*/ }} size={'small'}>
                                    <InputLabel id="labelCategory">Category</InputLabel>
                                    <Select
                                        labelId="labelCategory"
                                        id="selectCategory"
                                        value={fWrapper.category}
                                        label="Category"
                                        onChange={(event) => handleSelectChange(event, fWrapper.file)}
                                    >
                                        <MenuItem value={'null'}>Sem Categoria</MenuItem>
                                        {categories?.map((category, index) => (
                                            <MenuItem key={index} value={category.$id}>
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Button
                                    hidden={uploading}
                                    sx={{ width: '100%', flexShrink: 0, flexFlow: 1 }}
                                    size={'small'}
                                    variant="contained"
                                    color="error"
                                    onClick={() => {
                                        handleImageDelete(fWrapper.file);
                                    }}
                                >
                                    REMOVE
                                </Button>
                                <Box hidden={!uploading} sx={{ width: '100%' }}>
                                    <LinearProgress />
                                </Box>
                            </Stack>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default Fileupload;