import "./dashboard.css"
import {useEffect, useState} from "react";
import {useAuth} from "../../../utils/authContext.jsx";

import {FaClock, FaPen, FaTable, FaUser} from "react-icons/fa";
import {useOutletContext} from "react-router-dom";
import {FaX} from "react-icons/fa6";

import Clock from "../../../utils/Clock.jsx";
import {Row} from "react-bootstrap";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
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

const initialRows = [
    {
        id: "5e5ea5c16897e",
        name: "John Doe",
        email: "john@appwrite.io",
        phone: "+4930901820",
        $createdAt: new Date("2020-10-15T06:38:00.000+00:00"),
        $updatedAt: new Date("2020-10-15T06:41:11.000+00:00"),
    },
];

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, {id, name: '', email: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

function Dashboard(){

    const {user} = useAuth()

    const [rows, setRows] = useState(initialRows);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        console.log(rowModesModel)
    };

    const handleDeleteClick = (id) => () => {
        setState( () => {
            return true
        });
        //setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        console.log(rows)
        console.log(newRow)

        if (newRow.isNew === true){
            console.log("new user")
            delete newRow.isNew;
            setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
            return newRow;
        }

        const updatedRow = { ...newRow, isNew: false };

        console.log(updatedRow)
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        console.log(rows)
        console.log(updatedRow)
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 180, editable: false },
        { field: 'name', headerName: 'Name', width: 180, editable: true },
        {
            field: 'email',
            headerName: 'Email',
            type: 'email',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: 'phone',
            headerName: 'Phone',
            type: 'text',
            width: 180,
            align: 'left',
            headerAlign: 'left',
            editable: true,
        },
        {
            field: '$createdAt',
            headerName: 'Created At',
            type: 'date',
            width: 180,
            editable: false,
        },
        {
            field: '$updatedAt',
            headerName: 'Updated At',
            type: 'date',
            width: 180,
            editable: false,
        },
        /*{
            field: 'role',
            headerName: 'Department',
            width: 220,
            editable: true,
            type: 'singleSelect',
            valueOptions: ['Market', 'Finance', 'Development'],
        },*/
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

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
                <h1 className="mt-4 mb-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                {/*<div className="row">*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-primary text-white mb-4">*/}
                {/*            <div className="card-body">Primary Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-warning text-white mb-4">*/}
                {/*            <div className="card-body">Warning Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-success text-white mb-4">*/}
                {/*            <div className="card-body">Success Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div className="col-xl-3 col-md-6">*/}
                {/*        <div className="card bg-danger text-white mb-4">*/}
                {/*            <div className="card-body">Danger Card</div>*/}
                {/*            <div className="card-footer d-flex align-items-center justify-content-between">*/}
                {/*                <a className="small text-white stretched-link" href="#">View Details</a>*/}
                {/*                <div className="small text-white"><i className="fas fa-angle-right"></i>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}

                <Row>
                    <div className={"col-xl-3 col-md-6"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaUser className={"me-1"}></FaUser> Welcome
                            </div>
                            <div className="card-body">
                                <p>user: <span>{user ? user.name : "user"}</span></p>
                                <p>email: <span>{user ? user.email : "email"}</span></p>
                            </div>
                        </div>
                    </div>

                    <div className={"col-xl-3 col-md-6"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaClock className={"me-1"}></FaClock> Today&apos;s date
                            </div>
                            <div className="card-body">
                                <Clock />
                            </div>
                        </div>
                    </div>
                </Row>

                <Row>
                    <div className={"col"}>
                        <div className="card mb-4">
                            <div className="card-header">
                                <FaTable className={"me-1"}></FaTable> Table users
                            </div>
                            <div className="card-body">

                                {renderConfirmDialog()}

                                <Box
                                    sx={{
                                        height: 500,
                                        width: '100%',
                                        '& .actions': {
                                            color: 'text.secondary',
                                        },
                                        '& .textPrimary': {
                                            color: 'text.primary',
                                        },
                                    }}
                                >
                                    <DataGrid
                                        rows={rows}
                                        columns={columns}
                                        editMode="row"
                                        rowModesModel={rowModesModel}
                                        onRowModesModelChange={handleRowModesModelChange}
                                        onRowEditStop={handleRowEditStop}
                                        processRowUpdate={processRowUpdate}
                                        slots={{
                                            toolbar: EditToolbar,
                                        }}
                                        slotProps={{
                                            toolbar: { setRows, setRowModesModel },
                                        }}
                                    />
                                </Box>

                                {/*<table id="datatablesSimple">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Permissions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {allUsers ?
                                        allUsers.map(userdata => {
                                            return (
                                                <>
                                                    <tr key={userdata.id}>
                                                        <td>{userdata.id}</td>
                                                        <td>{userdata.name}</td>
                                                        <td>{userdata.email}</td>
                                                        <td>{userdata.permissions}</td>
                                                    </tr>
                                                </>
                                            )
                                        })

                                        :

                                        <tr>no data found</tr>
                                    }
                                    </tbody>
                                </table>*/}
                            </div>
                        </div>
                    </div>
                </Row>
            </div>
        </>
    )
}

export default Dashboard;