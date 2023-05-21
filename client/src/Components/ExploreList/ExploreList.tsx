import React, { useState } from "react";
import "./ExploreList.css";
import { HostEaseEvent } from "../../Types/Types";
import EventCard from "../EventCard/EventCard";

interface ExploreListOptions {
  label: string;
  action ?: () => void;
}

interface ExploreListProps {
  listToFilter: HostEaseEvent[];
  filterOptions: ExploreListOptions[];
}

const ExploreList: React.FC<ExploreListProps> = ({
  listToFilter,
  filterOptions,
}) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const filteredList = selectedButton
    ? listToFilter.filter(
        (event) =>
          event.category?.categoryName.toLowerCase() ===
          selectedButton.toLowerCase()
      )
    : listToFilter;

    console.log(filterOptions)
    console.log(listToFilter);

  return (
    <div className="explorer-container">
      <div className={`options-panel ${isMenuOpen ? "visible" : ""}`}>
        {filterOptions.map((element, index) => (
          <button
            key={index.toString() + element}
            onClick={() => {
              if (selectedButton === element.label) {
                setSelectedButton(null); 
              } else {
                setSelectedButton(element.label);
              }
            }}
            className={selectedButton === element.label ? "active" : ""}
          >
            {element.label}
          </button>
        ))}
      </div>
      <div className="event-grid">
        {filteredList.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            likes={event.likes}
            startDate={event.startDate}
            endDate={event.endDate && event.endDate}
            startTime={event.startTime}
            endTime={event.endTime}
            locationLat={event.locationLat}
            locationLng={event.locationLng}
            tags={event.tags}
            users={event.users}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreList;
