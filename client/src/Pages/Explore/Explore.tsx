import React, { useEffect, useState } from "react";
import "./Explore.css";
import ExploreList from "../../Components/ExploreList";
import { Category, HostEaseEvent } from "../../Types/Types";
import { fetchAllCategories, fetchAllEvents } from "../../services/main.services";
import { useOutletContext } from "react-router-dom";

const Explore = () => {
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

  console.log('EVENTOS: ', allEvents);
  console.log('CAT:', allCategories);

  return (
    <>
      {allEvents && allCategories ? (
        <ExploreList
          
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
