import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import './Table.css';

const columns: GridColDef[] = [
    {
        field: 'title',
        headerName: 'Title',
        width: 250
    },
    {
        field: 'startDate',
        headerName: 'Start date',
        width: 180,
        editable: false,
        align: 'left',
    },
    {
        field: 'startTime',
        headerName: 'Start time',
        width: 180,
        editable: false,
        align: 'left',
    },
    {
        field: 'maxCapacity',
        headerName: 'Capacity',
        type: 'number',
        width: 180,
        editable: false,
        align: 'left',
    },
    {
        field: 'users',
        headerName: 'Joined users',
        type: 'number',
        width: 180,
        editable: false,
        align: 'left',
    }
];

const createData = (id: number, title: string, startDate: string, startTime: string, maxCapacity: number, users: number) => {
    return { id, title, startDate, startTime, maxCapacity, users };
}

const rows = [
    createData(1, 'Event 1', '2021-10-10', '10:00', 10, 5),
    createData(2, 'Event 2', '2021-10-10', '10:00', 10, 5),
    createData(3, 'Event 3', '2021-10-10', '10:00', 10, 5),
    createData(4, 'Event 4', '2021-10-10', '10:00', 10, 5),
    createData(5, 'Event 5', '2021-10-10', '10:00', 10, 5),
    createData(6, 'Event 6', '2021-10-10', '10:00', 10, 5),
]

const DataTable = () => {
    return (
        <div className='table'>
            <h3 className='table-title'>Recent Events</h3>
            <Box sx={{ height: 520, width: '100%', background: 'white', maxHeight: '70%', boxShadow: '0px 15px 20px 0px #80808029' }}>
                <DataGrid
                    rows={rows}
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
}

export default DataTable;
