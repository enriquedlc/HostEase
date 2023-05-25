import Cards from "../Cards/Cards";
import "./MainDashboard.css";

import { useEffect, useState } from "react";
import { HostEaseEvent } from "../../../../Types/Types";
import { fetchAllEvents } from "../../../../services/main.services";
import EventTable from "../Tables/EventTable";

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
      <EventTable />
    </div>
  );
};

export default MainDashboard;
