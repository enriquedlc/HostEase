import Cards from "../Cards/Cards";
import EventTable from "../Tables/EventTable";

import "./MainDashboard.css";

const MainDashboard = () => {

  return (
    <div className="main-dashboard">
      <h1 className="main-dashboard-title">Dashboard</h1>
      <Cards />
      <EventTable />
    </div>
  );
};

export default MainDashboard;
