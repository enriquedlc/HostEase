import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';
import { Link, useNavigate } from 'react-router-dom';

import { Category } from '../../../../Types/Types';
import { deleteCategoryById, fetchAllCategories } from "../../../../services/main.services";
import { deleteToast } from '../../../../utils/AdminToast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@mui/material";
import { MdNewLabel } from "react-icons/md";
import { HostEaseRoutes } from "../../../../Types/AppRoutes/HostEaseRoutes";
import SearchBar from "../SearchBar/SearchBar";

import CustomCategoryActions from "../CustomActions/CustomCategoryActions";
import './Table.css';

const CategoryTable = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDeleteClick = useCallback((id: number) => {
        deleteCategoryById(id).then(() => {
            deleteToast("Category", id)
            setTimeout(() => {
                navigate(HostEaseRoutes.Admin)
            }, 2000)
        })
    }, [navigate, categories]);

    useEffect(() => {
        const getAllCategories = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2200));
            const response = await fetchAllCategories();
            setCategories(response.data.data);
            setIsLoading(false);
        }
        getAllCategories();
    }, []);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            width: 250,
        },
        {
            field: "categoryName",
            headerName: "Category name",
            width: 300,
            editable: false,
            align: "left",
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 270,
            editable: false,
            align: "left",
            renderCell: (params) => (
                <CustomCategoryActions
                    categoryId={params.row.id}
                    onDelete={handleDeleteClick} />
            )
        },
    ], []);

    const handleSearch = (value: string) => {
        if (categories) {
            const filteredCategories = categories.filter((category) =>
                category?.categoryName?.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredCategories(filteredCategories);
        }
    }

    return (
        <div className="table">
            <h3 className="table-title">Categories</h3>
            <SearchBar onSearch={handleSearch} />
            <Link to={`${HostEaseRoutes.AdminCategories}/create`}>
                <Button
                    color="secondary"
                    variant="contained"
                    size="large"
                    style={{ marginLeft: "10px", padding: ".5rem", marginBottom: "1rem" }}>
                    <MdNewLabel />
                </Button>
            </Link>
            <Box
                sx={{
                    height: 300,
                    width: "100%",
                    background: "white",
                    maxHeight: "70%",
                    boxShadow: "0px 15px 20px 0px #80808029",
                }}
            >
                {isLoading ? (
                    <div className="loading-container">
                        <ReactLoading type="bars" color="#FC929D" height={50} width={50} />
                    </div>
                ) : (
                    <DataGrid
                        rows={filteredCategories.length > 0 ? filteredCategories : categories}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                )}
            </Box>
            <ToastContainer />
        </div>
    );

};

export default CategoryTable;
