import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ExploreList from "../../Components/ExploreList";
import { Category, HostEaseEvent, UserContextValue } from "../../Types/Types";
import {
  fetchAllCategories,
  fetchAllEvents,
} from "../../services/main.services";
import Loading from "../../Components/Loading/Loading";

const Explore = () => {
  const userContext = useOutletContext<UserContextValue | null>();
  const [allEvents, setAllEvents] = useState<HostEaseEvent[] | null>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllData = async () => {
      await fetchAllEvents().then((response) => {
        setAllEvents(response.data.data);
      });
      await fetchAllCategories().then((response) => {
        setAllCategories(response.data.data);
      });
      setLoading(false);
    };
    getAllData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading theme={userContext?.theme} />
      ) : allEvents && allCategories ? (
        <ExploreList
          theme={userContext?.theme}
          listToFilter={allEvents}
          filterOptions={allCategories.map((category) => ({
            label: category.categoryName,
          }))}
        />
      ) : null}
    </>
  );
};

export default Explore;
