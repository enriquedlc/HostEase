import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { User } from '../../../../Types/Types';

import { ThemeProvider, createTheme } from '@mui/material';
import { GridColDef } from "@mui/x-data-grid";
import { ImBin } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserModal from '../../../../Components/Modals/UserModal/UserModal';

import './Table.css';

const theme = createTheme({});

const deletedUserToast = (id: number) => {
    toast.warning(`User with id ${id} deleted`, {
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

interface UserTableProps {
    userList: User[]
    title: string
}

const UserTable = (props: UserTableProps) => {

    const { userList, title } = props;

    const navigate = useNavigate()

    const columns: GridColDef[] = [
        {
            field: "nickname",
            headerName: "Nickname",
            width: 230,
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
            width: 250,
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
    ]

    const handleDeleteClick = (id: number) => {
        deleteUserById(id).then(() => {
            deletedUserToast(id)
            setTimeout(() => {
            navigate('/admin')
            }, 3500)
        })
    }

    const CustomActions = (id: number) => {
        return (
            <ThemeProvider theme={theme}>
                <UserModal userId={id} />
                <button
                    onClick={() => handleDeleteClick(id)}>
                    <ImBin />
                </button>
            </ThemeProvider>
        );
    };

    return (

        <div className="table">
            <h3 className="table-title">{title}</h3>
            <Box
                sx={{
                    height: 480,
                    width: "100%",
                    background: "white",
                    maxHeight: "70%",
                    boxShadow: "0px 15px 20px 0px #80808029",
                }}
            >
                <DataGrid
                    rows={userList}
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
            </Box>
            <ToastContainer />
        </div>

    );
};


export default UserTable