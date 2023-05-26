import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';

// import { SearchBar } from '../../Components/SearchBar/SearchBar.jsx'
import "./Table.css";

import { HostEaseEvent } from "../../../../Types/Types";
import { fetchAllEvents } from "../../../../services/main.services";
import SearchBar from "../SearchBar/SearchBar";

const EventTable = () => {
  const [events, setEvents] = useState<HostEaseEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<HostEaseEvent[]>([]); // [1
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

  const handleSearch = (value: string) => {
    if (events) {
      const filteredEvents = events.filter((event) =>
        event?.title?.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredEvents(filteredEvents);
    }
  }

  return (
    <div className="table">
      <h3 className="table-title">Events</h3>
      <SearchBar onSearch={handleSearch} />
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
            rows={filteredEvents.length > 0 ? filteredEvents : events}
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
