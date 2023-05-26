import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import axios from "axios";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

import { HostEaseEvent } from '../../../../Types/Types';
import { fetchAllEvents, fetchAllUsers } from "../../../../services/main.services";
import { deleteToast } from '../../../../utils/AdminToast';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CustomUserActions from '../CustomActions/CustomUserActions';
import './Table.css';
import SearchBar from "../SearchBar/SearchBar";
import CustomEventActions from "../CustomActions/CustomEventsActions";

const deleteEventById = (id: number) => {
  return axios.delete(`http://localhost:8080/hostease/event/${id}`)
}

const EventTable = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState<HostEaseEvent[]>([])
  const [filteredEvents, setFilteredEvents] = useState<HostEaseEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDeleteClick = useCallback((id: number) => {
    deleteEventById(id).then(() => {
      deleteToast("Event", id)
      setTimeout(() => {
        navigate('/admin')
      }, 2000)
    })
  }, [navigate]);

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
      renderCell: (params) => (
        <CustomEventActions eventId={params.row.id} onDelete={handleDeleteClick} />
      )
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
      <h3 className="table-title">Recent events</h3>
      <SearchBar onSearch={handleSearch} />
      <Box
        sx={{
          height: 380,
          width: "100%",
          background: "white",
          maxHeight: "70%",
          boxShadow: "0px 15px 20px 0px #80808029",
        }}
      >
        {isLoading ? (
          <div className="loading-container">
            <ReactLoading type="bars" color="#FC929D" height={50} width={50} />
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
      <ToastContainer />
    </div>
  );

};

export default EventTable;
