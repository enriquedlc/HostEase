import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import axios from "axios";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';
import { Link, useNavigate } from 'react-router-dom';

import { Tag } from '../../../../Types/Types';
import { fetchAllTags } from "../../../../services/main.services";
import { deleteToast } from '../../../../utils/AdminToast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomTagActions from "../CustomActions/CustomTagActions";
import SearchBar from "../SearchBar/SearchBar";
import { HostEaseRoutes } from "../../../../Types/AppRoutes/HostEaseRoutes";
import { Button } from "@mui/material";
import { MdNewLabel } from "react-icons/md";

import './Table.css';

const deleteTagById = (id: number) => {
    return axios.delete(`http://localhost:8080/hostease/tags/${id}`)
}

const TagTable = () => {
    const navigate = useNavigate()
    const [tags, setTags] = useState<Tag[]>([])
    const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleDeleteClick = useCallback((id: number) => {
        deleteTagById(id).then(() => {
            deleteToast("Tag", id)
            setTimeout(() => {
                navigate('/admin')
            }, 2000)
        })
    }, [navigate, tags]);

    useEffect(() => {
        const getAllTags = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2200));
            const response = await fetchAllTags();
            setTags(response.data.data);
            setIsLoading(false);
        }
        getAllTags();
    }, []);

    const columns: GridColDef[] = useMemo(() => [
        {
            field: "id",
            headerName: "ID",
            width: 250,
        },
        {
            field: "tag",
            headerName: "Tag name",
            width: 180,
            editable: false,
            align: "left",
        },
        {
            field: 'color',
            headerName: 'Color',
            width: 180,
            editable: false,
            align: 'left',
            renderCell: (params) => {
                const color = params.value;
                const colorStyle = {
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    marginRight: '8px',
                    display: 'inline-block',
                    verticalAlign: 'middle',
                };
                const textStyle = {
                    display: 'inline-block',
                    verticalAlign: 'middle',
                };
                return (
                    <Box>
                        <Box sx={colorStyle} />
                        <Box sx={textStyle}>{color}</Box>
                    </Box>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 250,
            editable: false,
            align: "left",
            renderCell: (params) => (
                <CustomTagActions
                    tagId={params.row.id}
                    onDelete={handleDeleteClick} />
            )
        },
    ], []);

    const handleSearch = (value: string) => {
        if (tags) {
            const filteredTags = tags.filter((tag) =>
                tag?.tag?.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredTags(filteredTags);
        }
    }

    return (
        <div className="table">
            <h3 className="table-title">Tags</h3>
            <SearchBar onSearch={handleSearch} />
            <Link to={`${HostEaseRoutes.AdminTags}/create`}>
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
                    height: 340,
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
                        rows={filteredTags.length > 0 ? filteredTags : tags}
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

export default TagTable;
