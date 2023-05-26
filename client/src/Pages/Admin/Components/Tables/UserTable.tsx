import { Button } from '@mui/material';
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from '../../../../Types/Types';

import { ThemeProvider, createTheme } from '@mui/material';
import { GridColDef } from "@mui/x-data-grid";
import { ImBin } from "react-icons/im";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserModal from '../../../../Components/Modals/UserModal/UserModal';

import { fetchAllUsers } from "../../../../services/main.services";
import './Table.css';

const theme = createTheme({});

const deletedUserToast = (id: number) => {
    toast.success(`User with id ${id} deleted ❌`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
}

const deleteUserById = (id: number) => {
    return axios.delete(`http://localhost:8080/hostease/users/${id}`)
}

const UserTable = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>("")

    const handleDeleteClick = useCallback((id: number) => {
        deleteUserById(id).then(() => {
            deletedUserToast(id)
            setTimeout(() => {
                navigate('/admin')
            }, 3500)
        })
    }, [navigate]);

    const CustomActions = useCallback((id: number) => {
        return (
            <div className='button-container'>
                <ThemeProvider theme={theme}>
                    <UserModal userId={id} />
                    <Button
                        color="error" variant="contained"
                        onClick={() => handleDeleteClick(id)}>
                        <ImBin />
                    </Button>
                </ThemeProvider>
            </div>
        );
    }, [handleDeleteClick]);

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
            renderCell: (params) => (CustomActions(params.row.id))
        },
    ], [CustomActions]);

    return (
        <div className="table">
            <h3 className="table-title">Users</h3>
            <Box
                sx={{
                    height: 480,
                    width: "100%",
                    background: "white",
                    maxHeight: "70%",
                    boxShadow: "0px 15px 20px 0px #80808029",
                }}
            >
                {isLoading ? (
                    <div className="loading-container">
                        <ReactLoading type="bars" color="" height={50} width={50} />
                    </div>
                ) : (
                    <DataGrid
                        rows={users ? users : []}
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
