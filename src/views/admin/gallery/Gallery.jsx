import "./gallery.css"
import {FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";
import {useEffect, useState} from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {Dialog, DialogActions, DialogContent, DialogTitle, Toolbar} from "@mui/material";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';

// const initialRows = [
//     {
//         id: "5e5ea5c16897e",
//         name: "John Doe",
//         email: "john@appwrite.io",
//         phone: "+4930901820",
//         $createdAt: new Date("2020-10-15T06:38:00.000+00:00"),
//         $updatedAt: new Date("2020-10-15T06:41:11.000+00:00"),
//     },
// ];

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

    const getGalleryData = async () => {
        const images = await getGallery()

        let dataArray = []

        for (let row of images.documents){
            let image_path = await getImagesByID(row.image_id)
            dataArray.push({
                id: row.$id,
                category_id: row.category_id,
                image_id: image_path,
                createdAt: new Date(row.$createdAt),
                updatedAt: new Date(row.$updatedAt),
            })
        }
        setRows(dataArray)
    }

    const [rowModesModel, setRowModesModel] = useState({});

    const handleEditClick = (id) => () => {
        alert("edit")
    };

    const handleDeleteClick = (id) => () => {
        alert("delete")
        setState( () => {
            return true
        });
    };

    /*const processRowUpdate = (newRow) => {
        alert("row edited")
        /!*const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;*!/
    };*/

    const columns = [
        { field: 'id', headerName: 'ID', width: 180, editable: false },
        //{ field: 'name', headerName: 'Name', width: 180, editable: false },
        { field: 'image_id', headerName: 'Image', width: 180, editable: false,
            renderCell: (params) => (
                <img src={params.row.image_id.href}/> //TODO: appwrite says it needs user permissions to view file, but i already have permissions
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
                            columnVisibilityModel={ {id: false} }
                            rows={rows}
                            columns={columns}
                            autoPageSize
                            slots={{
                                toolbar: ToolbarButtons
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