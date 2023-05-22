import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ExploreList from "../../Components/ExploreList";
import { Category, HostEaseEvent, UserContextValue } from "../../Types/Types";
import { fetchAllCategories, fetchAllEvents } from "../../services/main.services";

const Explore = () => {
  const userContext = useOutletContext<UserContextValue | null>();
  const [allEvents, setAllEvents] = useState<HostEaseEvent[] | null>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  useEffect(() => {
    const getAllEvents = async () => {
        await fetchAllEvents().then(( response ) => {
            setAllEvents(response.data.data);
        })
    };
    const getAllCategories = async () => {
        await fetchAllCategories().then(( response ) => {
            setAllCategories(response.data.data);
        })
    };
    getAllEvents();
    getAllCategories();
  }, []);

  return (
    <>
      {allEvents && allCategories ? (
        <ExploreList

          theme={userContext?.theme}
          listToFilter={allEvents}
          filterOptions={allCategories.map(category => ({
            label: category.categoryName
          }))}
        />
      ) : null}
    </>
  );
};

export default Explore;
