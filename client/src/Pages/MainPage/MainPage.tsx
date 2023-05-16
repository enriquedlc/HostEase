import React, { useContext } from "react";
import UserContext from "../../Context/UserContext";
import "./MainPage.css";
import EventCard from "../../Components/EventCard/EventCard";
import { HostEaseEvent } from "../../Types/Types";
import noEvents from "./assets/noEvents.jpg"

const MainPage = () => {
  const userContext = useContext(UserContext);
  console.log("PÁGINA PRINCIPAL", userContext?.user);
  const user = userContext?.user;

  return (
    <div className="dashboard-site-page">
      <h1 className={`${userContext?.theme}-header`}>
        Welcome, {user?.nickname}
      </h1>
      <div className="">
        <h1 className={`${userContext?.theme}-header`}>Your events</h1>
        {user?.events ? (
          <div className="dashboard-site-events">
            {user?.events.map(
              ({
                id,
                title,
                likes,
                startDate,
                startTime,
                endDate,
                endTime,
                locationLat,
                locationLng,
                category,
                maxCapacity,
                messages,
                tags,
                users,
              }) => {
                return (
                  <EventCard
                    key={id}
                    id={id}
                    title={title}
                    likes={likes}
                    startDate={startDate}
                    endDate={endDate && endDate}
                    startTime={startTime}
                    endTime={endTime}
                    locationLat={locationLat}
                    locationLng={locationLng}
                    tags={tags}
                    users={users}
                  />
                );
              }
            )}
          </div>
        ) : (
          <div className={`eventless ${userContext?.theme}-theme-mssg`}>
            <h2>No te has unido o has creado ningún evento todavía</h2>
            <img src={noEvents} alt="No Events?"/>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
