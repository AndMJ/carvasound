import "./gallery.css"

import {FaImages, FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";
import Fileupload from "../../../components/upload/fileupload.jsx";


import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    Chip,
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

    const handleDelete = () => {

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
    const { getGalleryList, getStorageImagesByID, getCategoryByID, deleteGalleryByID, deleteStorageImagesByID } = useAuth();

    const [rows, setRows] = useState([]);
    const [LoadingState, setLoadingState] = useState(true);

    useEffect(() =>  {
        formatGalleryData()
            .then((response) => {
                if (response.length > 0){
                    setRows(response)
                }
                setLoadingState(false)
            })
    }, [])

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
                        onClick={handleDeleteClick(row.id, row.image_id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleEditClick = (id) => () => {
        alert("edit")
    };

    const handleDeleteClick = (id, image_id) => async () => {
        //console.log(id)
        let response

        response = await deleteGalleryByID(id)
        console.log(response)

        console.log(image_id)
        response = await deleteStorageImagesByID(image_id)
        console.log(response)

        // setState( () => {
        //     return true
        // });
    };


    const handleNo = () => {
        // const { oldRow, resolve } = promiseArguments;
        // resolve(oldRow); // Resolve with the old row to not update the internal state
        // setPromiseArguments(null);

        // setState( () => {
        //     return false
        // });
    };

    const handleYes = async () => {
        // const { newRow, oldRow, reject, resolve } = promiseArguments;
        //
        // try {
        //     // Make the HTTP request to save in the backend
        //     const response = await mutateRow(newRow);
        //     setSnackbar({ children: 'User successfully saved', severity: 'success' });
        //     resolve(response);
        //     setPromiseArguments(null);
        // } catch (error) {
        //     setSnackbar({ children: "Name can't be empty", severity: 'error' });
        //     reject(oldRow);
        //     setPromiseArguments(null);
        // }

        // setState( () => {
        //     return false
        // });
    };

    const [state, setState ] = useState(false);
    const renderConfirmDialog = () => {

        if (!state) {
            return null;
        }

        return (
            <Dialog
                maxWidth="xs"
                TransitionProps={{ onEntered: () => {} }}
                open={open}
            >
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent dividers>
                    Pressing 'Yes' will delete this user.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleNo}>
                        No
                    </Button>
                    <Button onClick={handleYes}>Yes</Button>
                </DialogActions>
            </Dialog>
        );
    };


    return (
        <>
            <div className="container-fluid px-4">
                <h1 className="mt-4 mb-4">Gallery</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Gallery</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <FaImages className={"me-1"}></FaImages> Upload images
                    </div>
                    <div className="card-body">
                        <Fileupload></Fileupload>
                    </div>
                </div>

                <div className="card mb-4">
                    <div className="card-header">
                        <FaTable className={"me-1"}></FaTable> Gallery table
                    </div>
                    <div className="card-body p-0">

                        {renderConfirmDialog()}

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
                                },
                            }}
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'createdAt', sort: 'desc' }], //TODO: get data already sorted DESC from API with Query
                                },
                                pagination: { paginationModel: { pageSize: 5 } },
                            }}
                            pageSizeOptions={[5, 10, 25]}
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


                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Gallery;