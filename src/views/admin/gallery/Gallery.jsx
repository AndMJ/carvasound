import "./gallery.css"
import {FaImages, FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {Dialog, DialogActions, DialogContent, DialogTitle, LinearProgress, Toolbar} from "@mui/material";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

import BsButton from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Fileupload from "../../../components/upload/fileupload.jsx";

const ToolbarButtons = () => {
    const AddNewImage = () => {
        alert("add img")
    };

    const AddNewCategory = () => {
        alert("add cat")
    };

    return (
        <>
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={AddNewImage}>
                    Add Image
                </Button>
                <Button color="primary" startIcon={<AddIcon />} onClick={AddNewCategory}>
                    Add Category
                </Button>
            </GridToolbarContainer>
        </>
    );
}

const Gallery = () => {
    const { getGallery, getImagesByID } = useAuth();

    const [rows, setRows] = useState([]);

    useEffect(() =>  {
        getGalleryData()
    },[])

    const RowImage = (props) => {

        const handleImgClick = () => {
            alert("zoom image")
        }

        return (
            <div className={"w-100 p-1"} onClick={handleImgClick}>
                <img src={props.image_path} width={"100%"} height={"100%"}/>
            </div>
        )
    }

    const getGalleryData = async () => {

        const images = await getGallery()

        let dataArray = []

        for (let row of images.documents){
            let image_path = await getImagesByID(row.image_id)
            dataArray.push({
                id: row.$id,
                category_id: row.category_id,
                image: image_path,
                createdAt: new Date(row.$createdAt),
                updatedAt: new Date(row.$updatedAt),
            })
        }
        setRows(dataArray)
    }

    const handleEditClick = (id) => () => {
        alert("edit")
    };

    const handleDeleteClick = (id) => () => {
        alert("delete")
        setState( () => {
            return true
        });
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 180, editable: false },
        //{ field: 'name', headerName: 'Name', width: 180, editable: false },
        { field: 'image', headerName: 'Image', width: 100, editable: false,
            renderCell: (params) => (
                <RowImage image_path={params.row.image.href}></RowImage>
            )
        },
        //{ field: 'order', headerName: 'Order', width: 180, editable: true },
        { field: 'category_id', headerName: 'Category', width: 180, editable: false },
        { field: 'createdAt', headerName: 'Created At', type:"date", width: 180, editable: false },
        { field: 'updatedAt', headerName: 'Updated At', type:"date", width: 180, editable: false },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];


    const handleNo = () => {
        // const { oldRow, resolve } = promiseArguments;
        // resolve(oldRow); // Resolve with the old row to not update the internal state
        // setPromiseArguments(null);

        setState( () => {
            return false
        });
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

        setState( () => {
            return false
        });
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
                        <FaImages className={"me-1"}></FaImages>
                        Upload images
                    </div>
                    <div className="card-body">
                        <Fileupload></Fileupload>
                    </div>


                </div>

                <div className="card mb-4">
                    <div className="card-header">
                        <FaTable className={"me-1"}></FaTable>
                        Gallery table
                    </div>
                    <div className="card-body p-0">

                        {renderConfirmDialog()}

                        <DataGrid
                            sx={{
                                height: 600,
                                width: '100%',
                                border: 0,
                                '& .actions': {
                                    color: 'text.secondary',
                                },
                                '& .textPrimary': {
                                    color: 'text.primary',
                                },
                            }}
                            //processRowUpdate={processRowUpdate}
                            //getRowId={(row) => row.$id}
                            //onCellClick={handleOnCellClick}
                            //loading={rows}
                            rowHeight={100}
                            columnVisibilityModel={ {id: false} }
                            rows={rows}
                            columns={columns}
                            autoPageSize
                            slots={{
                                toolbar: ToolbarButtons,
                                loadingOverlay: LinearProgress,
                            }}
                            disableRowSelectionOnClick

                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default Gallery;