import "./gallery.css"

import {useEffect, useState} from "react";
import { FaImages, FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";
import Fileupload from "../../../components/upload/fileupload.jsx";

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import {
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    LinearProgress, ToggleButton,
    ToggleButtonGroup,
    Toolbar
} from "@mui/material";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import {useOutletContext} from "react-router-dom";
import client, {COLLECTION_GALLERY_ID, DATABASE_ID} from "../../../appwrite/appwrite.config.jsx";

const ToolbarButtons = () => {
    const [SelectedButton, setSelectedButton] = useState();

    const handleSelectedButton = (event, selected) => {
        setSelectedButton(selected);
        console.log(selected)
    };

    const handleNewCategory = () => {
        alert("add cat")
    };

    const handleCategoryFilter = () => {
        alert("filter table")
    };

    return (
        <>
            <GridToolbarContainer>
                <ToggleButtonGroup
                    color="primary"
                    value={SelectedButton}
                    exclusive
                    onChange={handleSelectedButton}
                >
                    <ToggleButton value="Casamentos">Casamentos</ToggleButton>
                    <ToggleButton value="Batizados">Batizados</ToggleButton>
                </ToggleButtonGroup>
            </GridToolbarContainer>
        </>
    );
}

const Gallery = () => {
    useEffect(() => {
        document.title = "Carvasound - Gallery";
    },[])

    const [newToastNotif] = useOutletContext()

    const {getGalleryList, getStorageImagesByID, getCategoryByID, deleteGalleryByID, deleteStorageImagesByID } = useAuth();

    const [LoadingState, setLoadingState] = useState(true);
    const [rows, setRows] = useState([]);
    //console.log(rows)

    const [processing, setProcessing] = useState(false);
    const [confirmDialogState, setConfirmDialogState ] = useState({"state": false, "data": {}});
    //console.log(confirmDialogState)



    useEffect(() =>  {
        formatGalleryData()
            .then((response) => {
                if (response.length > 0){
                    setRows(response)
                }
                setLoadingState(false)
            })
    }, [])

    useEffect(() => {
        const subscription = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_GALLERY_ID}.documents`, response => {
            // Callback will be executed on changes for all files.

            if(response.events.includes("databases.*.collections.*.documents.*.create")){
                console.info("create ", response.payload);

                //TODO: temporary callAll. change to call just when all image files are uploaded
                setLoadingState(true)
                formatGalleryData()
                    .then((response) => {

                        if (response.length > 0){
                            setRows(response)
                        }
                        setLoadingState(false)
                    })
            }

            if(response.events.includes("databases.*.collections.*.documents.*.update")){
                console.info("update ", response.payload);
            }

            if(response.events.includes("databases.*.collections.*.documents.*.delete")){
                console.info("delete ", response.payload);
                /*setRows(prevState => {
                    return prevState.filter(row => row.id !== response.payload.$id)
                })*/
                setLoadingState(true)
                formatGalleryData()
                    .then((response) => {

                        if (response.length > 0){
                            setRows(response)
                        }
                        setLoadingState(false)
                    })
            }
        });

        return () => {
            subscription();
        };
    }, []);

    const RenderCellImage = (props) => {
        const handleImgClick = () => {
            alert("zoom image")
        }

        return (
            <div className={"w-100 p-1"} onClick={handleImgClick}>
                <img src={props.image_path} width={"100%"} height={"100%"}/>
            </div>
        )
    }

    const formatGalleryData = async () => {
        const gallery_data = await getGalleryList()

        let dataArray = []

        for (let row of gallery_data.documents) {
            let category = null;
            const image_path = await getStorageImagesByID(row.image_id)

            //console.log("dsada " + row.category_id)
            if(row.category_id !== null){
                category = await getCategoryByID(row.category_id)
                //console.log("IN: " + category)
            }

            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.push({
                id: row.$id,
                category_id: row.category_id,
                category: category !== null ? category.name : null,
                image_id: row.image_id,
                image: image_path,
                createdAt: creAt.toLocaleString('en-GB'),
                updatedAt: upAt.toLocaleString('en-GB'),
            })
        }
        return dataArray
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 180, editable: false },
        { field: 'image_id', headerName: 'Image ID', width: 180, editable: false},
        { field: 'image', headerName: 'Image', width: 100, editable: false,
            renderCell: (params) => (
                <RenderCellImage image_path={params.row.image.href}></RenderCellImage>
            )
        },
        { field: 'category_id', headerName: 'Category ID', width: 180, editable: false},
        { field: 'category', headerName: 'Category', width: 180, editable: false,
            renderCell: (params) => {
                if(params.row.category === null){
                    return <span className={"text-muted"}>Sem categoria</span>
                }
            }
        },
        { field: 'createdAt', headerName: 'Created At', type:"text", width: 180, editable: false},
        { field: 'updatedAt', headerName: 'Updated At', type:"text", width: 180, editable: false},
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({row}) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(row.id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(row.id, row.image_id, row.image)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleEditClick = (id) => () => {
        alert("edit " + id)
    };

    const handleDeleteClick = (id, image_id, image) => async () => {
        setConfirmDialogState( (prevState) => {
            let dataRowToDel = {
                id: id,
                image_id: image_id,
                image: image
            }
            return {...prevState, state: true, data: dataRowToDel}
        });
    };

    const handle_ConfirmDialog_No = () => {
        setConfirmDialogState( (prevState) => {
            return {...prevState, state: false, data: {}}
        });
    };

    const handle_ConfirmDialog_Yes = async (id, image_id) => {
        function closeDialog(){
            setProcessing(() => {return false})
            setConfirmDialogState( (prevState) => {
                return {...prevState, state: false, data: {}}
            });
        }

        let response;
        setProcessing(() => {return true})
        try {
            response = await deleteGalleryByID(id)
            //console.log(response)
            //newToastNotif("success", "Image deleted.")
        } catch (error) {
            console.log(error)
            if (error.code !== 204){
                closeDialog()
                newToastNotif("error", error.message)
                return
            }
            //newToastNotif("error", error.message)
        }

        try {
            response = await deleteStorageImagesByID(image_id)
            //console.log(response)
            //newToastNotif("success", "Image deleted.")
        } catch (error) {
            console.log(error)
            if (error.code !== 204){
                closeDialog()
                newToastNotif("error", error.message)
                return
            }
            //newToastNotif("error", error.message)
        }

        /*setRows(prevState => {
            return prevState.filter(row => row.id !== response.payload.$id)
        })*/

        closeDialog()

        newToastNotif("success", "Image deleted.")

    };

    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <div className=" mb-4"> {/*d-sm-flex align-items-center justify-content-between*/}
                <h1 className="h3 mb-1 text-gray-800">Gallery</h1>
                <p className="mb-4">Upload, edit, remove and categorize images in your gallery.</p>
            </div>

            {/*// <!-- Content Row -->*/}
            <div className="row">

                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><span><FaImages className={"me-1"}></FaImages></span> Upload images</h6>
                        </div>
                        <div className="card-body">
                            <Fileupload></Fileupload>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><span><FaTable className={"me-1"}></FaTable></span> Gallery table</h6>
                        </div>
                        <div className="card-body gallery-table">

                            <Dialog
                                maxWidth="xs"
                                TransitionProps={{ onEntered: () => {} }}
                                open={confirmDialogState.state}
                            >
                                <DialogTitle>Confirm deletion</DialogTitle>
                                <DialogContent dividers>
                                    <img src={confirmDialogState.data.image ? confirmDialogState.data.image.href : ""} className="img-thumbnail mb-3" alt={"image to delete"}/>
                                    <h5 className={"mb-1"}>Are you sure?</h5>
                                    <p className={""}>Pressing 'Yes' will <span className={"text-danger"}>delete</span> this image from the platform.</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handle_ConfirmDialog_No}>No</Button>
                                    <Button onClick={() => {handle_ConfirmDialog_Yes(confirmDialogState.data.id, confirmDialogState.data.image_id)}} disabled={processing} >{processing ? <CircularProgress color="inherit" /> : "Yes" }</Button>
                                </DialogActions>
                            </Dialog>

                            <DataGrid
                                sx={{
                                    //height: 700,
                                    width: '100%',
                                    border: 0,
                                    '& .actions': {
                                        color: 'text.secondary',
                                    },
                                    '& .textPrimary': {
                                        color: 'text.primary',
                                    }
                                }}
                                initialState={{
                                    /*sorting: {
                                        sortModel: [{ field: 'createdAt', sort: 'desc' }],
                                    },*/
                                    pagination: { paginationModel: { pageSize: 5 } },
                                }}
                                pageSizeOptions={[5, 25, 50, 100]}
                                loading={LoadingState}
                                columnVisibilityModel={ {
                                    id: false,
                                    image_id: false,
                                    category_id: false
                                } }
                                rowHeight={100}
                                rows={rows}
                                columns={columns}
                                autoHeight
                                //autoPageSize
                                slots={{
                                    toolbar: ToolbarButtons,
                                    loadingOverlay: LinearProgress,
                                }}
                                disableRowSelectionOnClick
                                disableColumnSelector
                                //disableColumnMenu
                            ></DataGrid>

                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Gallery;