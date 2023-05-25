
import { ThemeProvider, createTheme } from '@mui/material';
import { GridColDef } from "@mui/x-data-grid";
import { BiInfoCircle } from "react-icons/bi";
import UserModal from '../../../../Components/Modals/UserModal/UserModal';

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
            <UserModal userId={id} />
            {/* delete logic */}
            <button
            // onClick={() => handleDetailClick(id)}
            >
                <BiInfoCircle />
            </button>
        </ThemeProvider>
    );
};

export const columns: GridColDef[] = [
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