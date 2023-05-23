import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import EventCard from "../../Components/EventCard/EventCard";
import Loading from "../../Components/Loading";
import { UserContextValue } from "../../Types/Types";
import "./MainPage.css";
import noEvents from "./assets/noEvents.jpg";

const MainPage = () => {
  const userContext = useOutletContext<UserContextValue | null>();
  const user = userContext?.user;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserEvents = async (context : UserContextValue) => {
      context.getUserEvents();
      setLoading(false);
    };
    user && getUserEvents(userContext)
  }, [])
  
  return (
    <div className="dashboard-site-page">
      <h1 className={`${userContext?.theme}-header`} style={{ marginBottom: 0 }}>
        Welcome, {user?.nickname}
      </h1>
      {loading ? <Loading theme={userContext?.theme}/> : user?.events ? (
        <>
          <h3 className={`${userContext?.theme}-header`} style={{ marginTop: 10, marginBottom: 0 }}>This are some of the events you have joined: </h3>
          <div className={`${userContext?.theme}-dashboard dashboard-site-events`}>
            {user.events?.map(
              (
                {
                  id,
                  title,
                  likes,
                  messages,
                  startDate,
                  startTime,
                  endDate,
                  endTime,
                  location,
                  tags,
                  users,
                  category,
                  maxCapacity
                },
                index
              ) => {
                return (
                  <EventCard
                    key={index}
                    id={id}
                    title={title}
                    likes={likes}
                    startDate={startDate}
                    endDate={endDate && endDate}
                    startTime={startTime}
                    endTime={endTime}
                    location={location}
                    tags={tags}
                    users={users}
                    category={category}
                    messages={messages}
                    maxCapacity={maxCapacity}
                  />
                );
              }
            )}
          </div>
        </>
      ) : (
        <div className={`eventless ${userContext?.theme}-theme-mssg`}>
          <h2>No te has unido o has creado ningún evento todavía</h2>
          <img src={noEvents} alt="No Events?" />
        </div>
      )}
    </div>
  );
};

export default MainPage;
