import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import "./EventTable.css";

import { HostEaseEvent } from "../../../../Types/Types";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 250,
  },
  {
    field: "startDate",
    headerName: "Start date",
    width: 180,
    editable: false,
    align: "left",
  },
  {
    field: "maxCapacity",
    headerName: "Capacity",
    type: "number",
    width: 180,
    editable: false,
    align: "left",
  },
  {
    field: "users",
    headerName: "Joined users",
    type: "number",
    width: 180,
    editable: false,
    align: "left",
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 180,
    editable: false,
    align: "left",
  },
];

const createData = (
  id: number,
  title: string | undefined,
  startDate: string | undefined,
  maxCapacity: number | undefined,
  users: number
) => {
  return { id, title, startDate, maxCapacity, users };
};

interface EventTableProps {
  eventList: HostEaseEvent[] | undefined;
  title: string;
}

// en vez del import de events, se puede hacer un fetch a la base de datos

const EventTable = (props: EventTableProps) => {
  const { eventList, title } = props;

  console.log('PENE EVENTABLE', eventList);

  const rows = eventList?.map((event: HostEaseEvent) => {
    return createData(
      event.id,
      event.title,
      event.startTime,
      event.maxCapacity,
      event.users
    );
  });

  return (
    <div className="table">
      <h3 className="table-title">{title}</h3>
      <Box
        sx={{
          height: 520,
          width: "100%",
          background: "white",
          maxHeight: "70%",
          boxShadow: "0px 15px 20px 0px #80808029",
        }}
      >
        <DataGrid
          rows={eventList ? eventList : []}
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

export default EventTable;
