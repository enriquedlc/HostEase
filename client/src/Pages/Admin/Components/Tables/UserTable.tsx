import { Button, createTheme, ThemeProvider } from '@mui/material';
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { User } from '../../../../Types/Types';
import { motion } from 'framer-motion';

import './Table.css';

const theme = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    background: 'linear-gradient(45deg, #bda2e7 19%, var(--ternary-color) 51%, var(--secondary-color) 95%)',
                    color: 'white', // Color de texto azul
                    border: '0px solid transparent', // Bordes transparentes
                    '&:hover': {
                        borderColor: 'blue', // Color de borde al pasar el cursor
                    },
                },
            },
        },
    },
});

const CustomActions = () => {
    return (
        <ThemeProvider theme={theme}>
            <motion.div 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
                <Button variant="contained">details</Button>
            </motion.div>
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
        renderCell: CustomActions
    },
]

const handleDetailClick = (id: number) => {
    console.log('Se hizo clic en el botón con el ID:', id);
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