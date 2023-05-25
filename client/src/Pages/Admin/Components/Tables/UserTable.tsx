import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { User } from '../../../../Types/Types';
import axios from "axios";

import './Table.css';

import { columns } from "./UserTableDef";

const fetchUserById = (id: number) => {
    return axios.get(`http://localhost:8080/hostease/users/${id}`)
}

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