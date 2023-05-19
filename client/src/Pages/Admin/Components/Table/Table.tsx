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

const rows = [
    { id: 1, title: 'Car Event', startDate: '10/10/2021', startTime: '10:00', maxCapacity: 10, users: 5 },
    { id: 2, title: 'Tech Event', startDate: '10/10/2021', startTime: '10:00', maxCapacity: 10, users: 5 },
    { id: 3, title: 'Music Event', startDate: '10/10/2021', startTime: '10:00', maxCapacity: 10, users: 5 },
    { id: 4, title: 'Food Event', startDate: '10/10/2021', startTime: '10:00', maxCapacity: 10, users: 5 },
    { id: 5, title: 'Meet and Greet', startDate: '10/10/2021', startTime: '10:00', maxCapacity: 10, users: 5 },
    { id: 6, title: 'Festival', startDate: '10/10/2021', startTime: '10:00', maxCapacity: 10, users: 5 },
]

const DataTable = () => {
    return (
        <div className='table'>
            <h3 className='table-title'>Recent Events</h3>
            <Box sx={{ height: 520, width: '100%', background: 'white', maxHeight: '70%' }}>
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
