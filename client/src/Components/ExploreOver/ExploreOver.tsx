import React, { useState } from "react";
import "./ExploreOver.css";
import { HostEaseEvent } from "../../Types/Types";
import EventCard from "../EventCard/EventCard";

interface ExploreOptions {
  label: string;
}
interface ExploreOverProps {
  listToFilter: HostEaseEvent[];
  filterOptions: ExploreOptions[];
}

const ExploreOver: React.FC<ExploreOverProps> = ({
  listToFilter,
  filterOptions,
}) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const filteredList = selectedButton
    ? listToFilter.filter(
        (event) =>
          event.category?.categoryName.toLowerCase() ===
          selectedButton.toLowerCase()
      )
    : listToFilter;

  const toggleOptions = () => {
    setIsOptionsVisible((prevIsVisible) => !prevIsVisible);
  };

  return (
    <div className="explorer-container">
      <div className={`options-panel ${isOptionsVisible ? "visible" : ""}`}>
        {filterOptions.map((element, index) => (
          <button
            key={index}
            onClick={() => {
              if (selectedButton === element.label) {
                setSelectedButton(null); // Deseleccionar el botón si se hace clic nuevamente en él
              } else {
                setSelectedButton(element.label);
              }
              toggleOptions();
            }}
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

export default ExploreOver;
