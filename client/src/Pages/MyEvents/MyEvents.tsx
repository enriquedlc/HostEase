import React, { useState, useEffect } from 'react'
import { useOutletContext, useParams } from 'react-router-dom';
import { Category, HostEaseEvent, UserContextValue } from '../../Types/Types';
import { fetchAllCategories, fetchUserEvents } from '../../services/main.services';
import ExploreList from '../../Components/ExploreList/ExploreList';

const MyEvents = () => {
    const userContext = useOutletContext<UserContextValue | null>();
    const [allEvents, setAllEvents] = useState<HostEaseEvent[] | null>([]);
    const [allCategories, setAllCategories] = useState<Category[]>([]);

    const { id } = useParams(); 

    useEffect(() => {
      const getAllEvents = async (id : number) => {
          await fetchUserEvents(id).then(( response ) => {
              setAllEvents(response.data.data);
          })
      };
      const getAllCategories = async () => {
          await fetchAllCategories().then(( response ) => {
              setAllCategories(response.data.data);
          })
      };
      id && getAllEvents(parseInt(id));
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
            mode='edit'
            owner={userContext?.user}
            currentUserId={userContext?.user?.id}
          />
        ) : null}
      </>
    );
}

export default MyEvents