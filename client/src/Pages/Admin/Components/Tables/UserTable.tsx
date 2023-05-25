import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User } from '../../../../Types/Types';
import './Table.css';

import { createTheme, ThemeProvider, Button } from '@mui/material';
import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import axios from "axios";

import { ImBin } from "react-icons/im";
import { BiInfoCircle } from "react-icons/bi";

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e88e5',
        },
    },
});

const CustomActions = (id: number) => {
    return (
        <ThemeProvider theme={theme}>
            <button
                onClick={() => handleDetailClick(id)}>
                <ImBin />
            </button>
            <button
                onClick={() => handleDetailClick(id)}>
                <BiInfoCircle />
            </button>
        </ThemeProvider>
    );
};



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

const fetchUserById = (id: number) => {
    return axios.get(`http://localhost:8080/hostease/users/${id}`)
}

const handleDetailClick = (id: number) => {
    fetchUserById(id)
    console.log(fetchUserById(id))
};

interface UserTableProps {
    userList: User[]
    title: string
}

const UserTable = (props: UserTableProps) => {

    const { userList, title } = props;

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
        </div>
    );
};


export default UserTable