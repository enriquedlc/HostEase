import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';

import "./Table.css";

import { HostEaseEvent } from "../../../../Types/Types";
import { fetchAllEvents } from "../../../../services/main.services";

const EventTable = () => {
  const [events, setEvents] = useState<HostEaseEvent[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAllEvents = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2200));
      const response = await fetchAllEvents();
      setEvents(response.data.data);
      setIsLoading(false);
    }
  
    getAllEvents();
  }, []);

  const columns: GridColDef[] = useMemo(() => [
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
  ], []);

  return (
    <div className="table">
      <h3 className="table-title">Events</h3>
      <Box
        sx={{
          height: 520,
          width: "100%",
          background: "white",
          maxHeight: "70%",
          boxShadow: "0px 15px 20px 0px #80808029",
        }}
      >
        {isLoading ? (
          <div className="loading-container">
            <ReactLoading type="bars" color="#bda2e1" height={50} width={50} />
          </div>
        ) : (
          <DataGrid
            rows={events ? events : []}
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
    </div>
  );
  
};

export default EventTable;
