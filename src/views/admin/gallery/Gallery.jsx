import "./gallery.css"

import {useEffect, useState} from "react";
import {FaImages, FaTable} from "react-icons/fa";
import {useAuth} from "../../../utils/authContext.jsx";
import {useOutletContext} from "react-router-dom";

import Fileupload from "../../../components/upload/fileupload.jsx";
import Category from "../category/Category.jsx";

import client, {
    COLLECTION_CATEGORY_ID,
    COLLECTION_GALLERY_ID,
    DATABASE_ID
} from "../../../appwrite/appwrite.config.jsx";

import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryIcon from '@mui/icons-material/Category';
import {
    Box,
    CircularProgress, createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, FormControl, InputLabel,
    LinearProgress, MenuItem, Select, ThemeProvider,
} from "@mui/material";
import {
    gridClasses,
    DataGrid,
    GRID_CHECKBOX_SELECTION_COL_DEF,
    GridActionsCellItem,
    GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarQuickFilter,
} from '@mui/x-data-grid';

//--------------------------------------------------------------------------------------------------------------------

const dataTableTheme = createTheme({
    typography: {
        fontSize: 14, // Adjust the font size as needed
    },
});

const Gallery = () => {
    useEffect(() => {
        document.title = "Carvasound - Gallery";
    },[])

    const [newToastNotif] = useOutletContext()

    const {addCategory, getCategoryList, updateCategoryByID, getCategoryByID, deleteCategoryByID, getGalleryListAdmin, getStorageImagesByID, updateGalleryByID, deleteGalleryByID, deleteStorageImagesByID, getStorageImagesThumbnailByID } = useAuth();

    const [categoriesList, setCategoriesList] = useState([])
    const [IsLoadingCategories, setIsLoadingCategories] = useState(false)
     const fetchCategories = async () => {
        setIsLoadingCategories(true)
        const categories = await getCategoryList();
        setCategoriesList(categories.documents)
        setIsLoadingCategories(false)
    }
    useEffect(() => {
        fetchCategories()
    }, []);
    useEffect(() => {
        const subscription = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_CATEGORY_ID}.documents`, response => {
            // Callback will be executed on changes for all files.

            if(
                response.events.includes("databases.*.collections.*.documents.*.create") ||
                response.events.includes("databases.*.collections.*.documents.*.update") ||
                response.events.includes("databases.*.collections.*.documents.*.delete")
            ){
                console.info("DB TRIGGER: ", response.payload);

                fetchCategories()
            }
        });

        return () => {
            subscription();
        };
    }, []);

    const [pageState, setPageState] = useState({
        isLoading: true,
        data: [],
        total: 0,
        page: 0,
        pageSize: 100
    })
    const fetchData = async () => {
        setPageState(old => ({...old, isLoading: true}))

        let dataArray = {
            data:[],
            total: 0
        }

        const nextpage = await getGalleryListAdmin(pageState.pageSize, pageState.pageSize * pageState.page) /*pageState.pageSize * pageState.page = the database page offset*/
        dataArray.total = nextpage.total
        //console.log(nextpage)

        for (let row of nextpage.documents) {

            const creAt = new Date(row.$createdAt)
            const upAt = new Date(row.$updatedAt)

            dataArray.data.push({
                id: row.$id,
                category_id: row.category !== null ? row.category.$id : "null",
                category: row.category !== null ? row.category.name : "Sem categoria"/*row.category*/,
                image_id: row.image_id,
                image: `https://cloud.appwrite.io/v1/storage/buckets/64c66ab828ead21c0093/files/${row.image_id}/preview?width=${Math.round(row.width * 0.10)}&project=64c40c5c8f44c3862248`,//getStorageImagesThumbnailByID(row.image_id, row.width, 0.10),
                /*{image_id: row.image_id, width: row.width}*/
                createdAt: creAt.toLocaleString('en-GB'),
                updatedAt: upAt.toLocaleString('en-GB'),
            })
        }

        setPageState(old => ({ ...old, isLoading: false, data: dataArray.data, total: dataArray.total }))
    };
    useEffect(() => {
        fetchData()
    }, [pageState.page, pageState.pageSize])
    useEffect(() => {
        const subscription = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_GALLERY_ID}.documents`, response => {
            // Callback will be executed on changes for all files.

            if(
                response.events.includes("databases.*.collections.*.documents.*.create") ||
                response.events.includes("databases.*.collections.*.documents.*.update") ||
                response.events.includes("databases.*.collections.*.documents.*.delete")
            ){
                console.info("DB TRIGGER: ", response.payload);

                fetchData()
            }
        });

        return () => {
            subscription();
        };
    }, []);

    const columns = [
        {
            ...GRID_CHECKBOX_SELECTION_COL_DEF,
        },
        { field: 'id', headerName: 'ID', editable: false, filterable: false, sortable: false, disableColumnMenu: true},
        { field: 'image_id', headerName: 'Image ID', editable: false, filterable: false, sortable: false, disableColumnMenu: true},
        { field: 'image', headerName: 'Image', width: 120, editable: false, filterable: false, sortable: false, disableColumnMenu: true,
            renderCell: (params) => (
                //<RenderCellImage image_id={params.row.image.image_id} image_width={params.row.image.width}></RenderCellImage>
                //<RenderCellImage imagePromise={params.row.image}></RenderCellImage>
                /*<div className={"w-100"} >
                    <img src={params.row.image} width={"100%"} height={"100%"} alt={"image thumbnail"}/>
                </div>*/

                <Box sx={{
                    minWidth: 100,
                    minHeight: 100,
                    width: 100,
                    height: 100,
                    p: 0.5
                }} >
                    <Box
                        component={"img"}
                        alt={"image thumbnail"}
                        src={params.row.image}
                        sx={{
                            borderRadius: 0.8,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            )//onClick={handleImgClick}
        },
        { field: 'category_id', headerName: 'Category ID', flex: 1, width: 180, editable: false, filterable: false, sortable: false, disableColumnMenu: true},
        { field: 'category', headerName: 'Category', flex: 1, width: 180, editable: false,
            /*renderCell: (params) => {
                if(params.row.category === null){
                    return "Sem categoria"
                } else {
                    return params.row.category.name
                }
            }*/
        },
        { field: 'createdAt', headerName: 'Created At', type:"text", flex: 1, width: 180, editable: false},
        { field: 'updatedAt', headerName: 'Updated At', type:"text", flex: 1, width: 180, editable: false},
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
                        onClick={handleEditClick(row.id, row.category_id, row.image)}
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

    /*TODO: implement https://mui.com/x/react-data-grid/editing/#full-featured-crud*/

    const [processing, setProcessing] = useState(false);
    const [showConfirmDialog, setShowConfirmDialog ] = useState(false);
    const [galleryToDelete, setGalleryToDelete] = useState("") // "" because <img src=/> cannot be null

    const handleDeleteClick = (id, image_id, image) => async () => {
        setShowConfirmDialog(true)
        setGalleryToDelete({
            id: id,
            image_id: image_id,
            image: image
        })
    };

    const handle_ConfirmDialog_No = () => {
        setShowConfirmDialog( false);
    };

    const handle_ConfirmDialog_Yes = async (id, image_id) => {
        function closeDialog(){
            setProcessing(false)
            setShowConfirmDialog( false);
        }

        setProcessing(true)
        try {
            await deleteGalleryByID(id)
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
            await deleteStorageImagesByID(image_id)
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

        closeDialog()

        newToastNotif("success", "Image deleted with success.")

    };


    const [galleryToUpdate, setGalleryToUpdate] = useState({id: null, image: ""})
    const [updateGalleryCategory, setUpdateGalleryCategory] = useState("")
    const [editModalShown, setEditModalShown] = useState(false)

    const handleEditClick = (id, category_id, image) => () => {
        //console.log(category_id)
        setGalleryToUpdate({id: id, image: image})
        setUpdateGalleryCategory(category_id)
        setEditModalShown(true)
    };

    const handleGalleryUpdate = async () => {
        setProcessing(true)

        const res = await updateGalleryByID(galleryToUpdate.id, {category: updateGalleryCategory})
        console.log(res)
        setProcessing(false)

        if(res.code === (400 || 403 || 401)){
            newToastNotif("error", res.message)
            return
        }

        newToastNotif("success", "Category updated with success.")
        setEditModalShown(false)
    }


    const [selectedTableRows, setSelectedTableRows] = useState([])
    const ToolbarButtons = () => {
        /*const [SelectedButton, setSelectedButton] = useState();

        const handleSelectedButton = (event, selected) => {
            setSelectedButton(selected);
            console.log(selected)
        };

        const handleNewCategory = () => {
            alert("add cat")
        };

        const handleCategoryFilter = () => {
            alert("filter table")
        };*/

        const handleClickDelete = () => {
            //alert("delete all selected")
            alert(selectedTableRows)
        };

        const handleClickCategorize = () => {
            alert("categorize")
        };

        return (
            <>

                <GridToolbarContainer>
                    {selectedTableRows.length > 0 && (
                        <>
                            <Button size={"small"} color="primary" startIcon={<DeleteIcon />} onClick={handleClickDelete}>
                                Apagar
                            </Button>

                            <Button size={"small"} color="primary" startIcon={<CategoryIcon />} onClick={handleClickCategorize}>
                                Categorizar
                            </Button>
                        </>
                    )}

                    <GridToolbarFilterButton />
                    <GridToolbarDensitySelector />
                    <GridToolbarQuickFilter />
                </GridToolbarContainer>
            </>

        )
    }


    return (
        <>
            {/*// <!-- Page Heading -->*/}
            <div className=" mb-4"> {/*d-sm-flex align-items-center justify-content-between*/}
                <h1 className="h3 mb-1 text-gray-800">Gallery</h1>
                <p className="mb-4">Upload, edit, remove and categorize images in your gallery.</p>
            </div>

            {/*// <!-- Content Row -->*/}
            <div className="row">

                <div className="col-12 col-xl-4 order-md-0 order-xl-2">
                    <div className="row">
                        <div className="col-12 order-1" > {/*TODO: add max height to the categories box?*/} {/* col-xxl-8  style={{minWidth:"991px"}}*/}
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    <h6 className="m-0 font-weight-bold text-primary"><span><FaImages className={"me-1"}></FaImages></span> Upload images</h6>
                                </div>
                                <div className="card-body">
                                    <Fileupload categories={categoriesList} newToastNotif={newToastNotif}></Fileupload>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 order-0"> {/*col-xl-4*/}
                            <div className="card shadow mb-4">
                                <Category IsLoadingCategories={IsLoadingCategories} setIsLoadingCategories={setIsLoadingCategories} updateCategoryByID={updateCategoryByID} newToastNotif={newToastNotif} addCategory={addCategory} categoriesList={categoriesList} deleteCategoryByID={deleteCategoryByID}></Category>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-12 col-xl-8">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary"><span><FaTable className={"me-1"}></FaTable></span> Gallery table</h6>
                        </div>
                        <div className="card-body gallery-table">

                            {/*DELETE CONFIRMATION MODAL/DIALOG*/}
                            <Dialog
                                maxWidth="xs"
                                TransitionProps={{ onEntered: () => {}, onExited: () => {setGalleryToDelete("")} }}
                                open={showConfirmDialog}
                            >
                                <DialogTitle>Delete Confirmation</DialogTitle>
                                <DialogContent>
                                    <img src={galleryToDelete.image} className="img-thumbnail mb-3 w-100" alt={"image thumbnail"}/>
                                    <h5 className={"mb-1"}>Are you sure you want to <span className={"text-danger"}>delete</span>?</h5>
                                    <p className={""}>Pressing 'Yes' will <span className={"text-danger"}>delete</span> this image from system.</p>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handle_ConfirmDialog_No}>No</Button>
                                    <Button onClick={() => {handle_ConfirmDialog_Yes(galleryToDelete.id, galleryToDelete.image_id)}} disabled={processing} >{processing ? <CircularProgress color="inherit" /> : "Yes" }</Button>
                                </DialogActions>
                            </Dialog>

                            {/*EDIT GALLERY-CATEGORY MODAL/DIALOG*/}
                            <Dialog
                                maxWidth={"xs"}
                                TransitionProps={{ onEntered: () => {}, onExited: () => {setUpdateGalleryCategory(""); setGalleryToUpdate({id: null, image: ""})} }}
                                open={editModalShown}
                            >
                                <DialogTitle>Edit Category</DialogTitle>
                                <DialogContent > {/*dividers*/}
                                    <Box sx={{ minWidth: 250}}>
                                        <img src={galleryToUpdate.image} className="img-thumbnail mb-3 w-100" alt={"image thumbnail"}/>
                                        <FormControl fullWidth>
                                            <InputLabel id="labelCategory">Category</InputLabel>
                                            <Select
                                                labelId="labelCategory"
                                                id="selectCategory"
                                                value={updateGalleryCategory}
                                                label="Category"
                                                onChange={(event) => setUpdateGalleryCategory(event.target.value)}
                                            >
                                                <MenuItem value={"null"}>Sem Categoria</MenuItem>
                                                {categoriesList?.map((category, index) => {
                                                    return (
                                                        <MenuItem key={index} value={category.$id}>{category.name}</MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => setEditModalShown(false)}>Cancel</Button>
                                    <Button onClick={() => handleGalleryUpdate()} disabled={processing} >{processing ? <CircularProgress size={24} color="inherit" /> : "Save" }</Button>
                                </DialogActions>
                            </Dialog>

                            <ThemeProvider theme={dataTableTheme}> {/*TODO: tooltip with current clicked cell data*/}
                            <DataGrid
                                sx={{
                                    height: 900,
                                    //overflowX: "auto",
                                    width: '100%',
                                    border: 0,
                                    '& .actions': {
                                        color: 'text.secondary',
                                    },
                                    '& .textPrimary': {
                                        color: 'text.primary',
                                    },

                                    /*remove the cell blue outline when clicked*/
                                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                                        outline: 'none',
                                    },
                                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]: {
                                        outline: 'none',
                                    },
                                }}
                                loading={pageState.isLoading}
                                columnVisibilityModel={ {
                                    id: false,
                                    image_id: false,
                                    category_id: false
                                } }
                                rowHeight={100}
                                columns={columns}
                                //autoHeight
                                slots={{
                                    toolbar: ToolbarButtons,
                                    loadingOverlay: LinearProgress,
                                }}
                                checkboxSelection
                                disableColumnSelector
                                disableRowSelectionOnClick

                                pagination
                                paginationModel={pageState}
                                rows={pageState.data}
                                rowCount={pageState.total}
                                pageSizeOptions={[100]}
                                paginationMode="server"
                                onPaginationModelChange={modelChange => {
                                    setPageState(old => ({ ...old, page: modelChange.page, pageSize: modelChange.pageSize }))
                                }}
                                keepNonExistentRowsSelected

                                onRowSelectionModelChange={(selectedRows) => {
                                    setSelectedTableRows(selectedRows)
                                }}
                            ></DataGrid>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )

}

export default Gallery;