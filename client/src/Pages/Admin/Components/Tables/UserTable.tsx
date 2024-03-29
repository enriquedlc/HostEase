import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import axios from "axios";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import { User } from '../../../../Types/Types';
import { fetchAllUsers } from "../../../../services/main.services";
import { deleteToast } from '../../../../utils/AdminToast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomUserActions from '../CustomActions/CustomUserActions';
import SearchBar from "../SearchBar/SearchBar";

import './Table.css';
import { HostEaseRoutes } from "../../../../Types/AppRoutes/HostEaseRoutes";

const deleteUserById = (id: number) => {
    return axios.delete(`http://localhost:8080/hostease/users/${id}`)
}

const UserTable = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState<User[]>([])
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleDeleteClick = useCallback((id: number) => {
        deleteUserById(id).then(() => {
            deleteToast("User", id)
            setTimeout(() => {
                navigate(HostEaseRoutes.Admin)
            }, 2000)
        })
    }, [navigate]);

    useEffect(() => {
        const getAllUsers = async () => {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 2200));
            setUsers((await fetchAllUsers()).data.data);
            setIsLoading(false);
        }
        getAllUsers();
    }, [])

    const columns: GridColDef[] = useMemo(() => [
        {
            field: "nickname",
            headerName: "Nickname",
            width: 180,
        },
        {
            field: "joinedAt",
            headerName: "Joined at",
            width: 180,
            editable: false,
            align: "left",
        },
        {
            field: "email",
            headerName: "Email",
            type: "number",
            width: 220,
            editable: false,
            align: "left",
        },
        {
            field: "phone",
            headerName: "Phone",
            type: "number",
            width: 180,
            editable: false,
            align: "left",
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 180,
            align: "left",
            renderCell: (params) => (
                <CustomUserActions id={params.row.id} onDelete={handleDeleteClick} />
            ),
        },
    ], [handleDeleteClick]);

    const handleSearch = (value: string) => {
        if (users) {
            const filteredUsers = users.filter((user) =>
                user?.nickname?.toLowerCase().includes(value.toLowerCase())
            )
            setFilteredUsers(filteredUsers);
        }
    }

    return (
        <div className="table">
            <h3 className="table-title">Users</h3>
            <SearchBar onSearch={handleSearch} />
            <Box
                sx={{
                    height: 380,
                    width: "100%",
                    background: "white",
                    maxHeight: "70%",
                    boxShadow: "0px 15px 20px 0px #80808029",
                }}
            >
                {isLoading ? (
                    <div className="loading-container">
                        <ReactLoading type="bars" color="#c484f3" height={50} width={50} />
                    </div>
                ) : (
                    <DataGrid
                        rows={filteredUsers.length > 0 ? filteredUsers : users}
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

export default UserTable;
