import Cards from "../Cards/Cards";
import "./MainDashboard.css";

import EventTable from "../Table/EventTable";
import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchAllEvents, fetchAllUsers } from "../../../../services/main.services";
import { HostEaseEvent, User, UserContextValue } from "../../../../Types/Types";

const MainDashboard = () => {

  
  const [events, setEvents] = useState<HostEaseEvent[]>([])

  useEffect(() => {
      fetchAllEvents().then((response) => {
        setEvents(response.data.data)
     })
  }, []);


  return (
    <div className="main-dashboard">
      <h1 className="main-dashboard-title">Dashboard</h1>
      <Cards />
      <EventTable eventList={events} title={"Recent Events"} />
    </div>
  );
};

export default MainDashboard;
