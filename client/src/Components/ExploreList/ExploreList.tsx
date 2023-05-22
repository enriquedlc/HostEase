import React, { useEffect, useState } from "react";
import "./ExploreList.css";
import { HostEaseEvent, Theme, User } from "../../Types/Types";
import EventCard from "../EventCard/EventCard";
import { toast } from "react-toastify";
import { deleteEvent } from "../../services/main.services";
import { ImBin } from "react-icons/im";
import { BiInfoCircle } from "react-icons/bi";
import { HiPencil } from "react-icons/hi";
import { IoMdExit } from "react-icons/io";

interface ExploreListOptions {
  label: string;
  action?: () => void;
}

interface ExploreListProps {
  listToFilter: HostEaseEvent[];
  filterOptions: ExploreListOptions[];
  mode?: "view" | "edit";
  theme?: Theme;
  owner?: User | null;
  currentUserId ?: number;
}

const ExploreList: React.FC<ExploreListProps> = ({
  listToFilter,
  filterOptions,
  theme,
  mode = "view",
  owner,
  currentUserId
}) => {
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [filteredList, setFilteredList] =
    useState<HostEaseEvent[]>(listToFilter);

  useEffect(() => {
    const updatedList = selectedButton
      ? listToFilter.filter((event) => {
          if (selectedButton !== "owned") {
            return (
              event.category?.categoryName.toLowerCase() ===
              selectedButton.toLowerCase()
            );
          } else if (owner) {
            return event.owner.id === owner?.id;
          }
        })
      : listToFilter;

    setFilteredList(updatedList);
  }, [selectedButton, listToFilter, owner]);

  const handleRemove = (
    eventId: number,
    action: "delete" | "leave",
    userId ?: number,
    eventName?: string
  ) => {
    if (action === "delete") {
      deleteEvent(eventId)
        .then((response) => {
          const result = response.data.data;
          if (result) {
            setFilteredList((prevList) =>
              prevList.filter((event) => event.id !== eventId)
            );
            if (!toast.isActive("deleteSuccessMessage")) {
              toast.success(
                `Se ha borrado correctamente el evento ${eventName}.`,
                {
                  toastId: "deleteSuccessMessage",
                  theme: theme,
                }
              );
            }
          } else {
            if (!toast.isActive("deleteWarningMessage")) {
              toast.info(`No se ha encontrado el evento ${eventName}.`, {
                toastId: "deleteWarningMessage",
                theme: theme,
              });
            }
          }
        })
        .catch(() => {
          if (!toast.isActive("deleteErrorMessage")) {
            toast.error(
              `Ha ocurrido un error al intentar borrar el evento ${eventName}.`,
              {
                toastId: "deleteErrorMessage",
                theme: theme,
              }
            );
          }
        });
    } else {
      /* removeUserFromEvent(eventId, userId)
        .then((response) => {
          const result = response.data.data;
          if (result) {
            setFilteredList((prevList) =>
              prevList.filter((event) => event.id !== eventId)
            );
            if (!toast.isActive("deleteSuccessMessage")) {
              toast.success(
                `Se ha borrado correctamente el evento ${eventName}.`,
                {
                  toastId: "deleteSuccessMessage",
                  theme: theme,
                }
              );
            }
          } else {
            if (!toast.isActive("deleteWarningMessage")) {
              toast.info(`No se ha encontrado el evento ${eventName}.`, {
                toastId: "deleteWarningMessage",
                theme: theme,
              });
            }
          }
        })
        .catch(() => {
          if (!toast.isActive("deleteErrorMessage")) {
            toast.error(
              `Ha ocurrido un error al intentar borrar el evento ${eventName}.`,
              {
                toastId: "deleteErrorMessage",
                theme: theme,
              }
            );
          }
        });

    */
    console.log('Me boi')
    }
  };

  return (
    <div className={`explorer-container ${theme}-scroll`}>
      <div
        className={`options-panel ${
          isMenuOpen ? "visible" : ""
        } ${theme}-panel`}
      >
        {filterOptions.map((element, index) => (
          <button
            key={index.toString()}
            onClick={() => {
              if (selectedButton === element.label) {
                setSelectedButton(null);
              } else {
                setSelectedButton(element.label);
              }
            }}
            className={`${selectedButton === element.label ? "active" : ""}`}
          >
            {element.label}
          </button>
        ))}
        {mode === "edit" && (
          <button
            className={`${selectedButton === "owned" ? "active" : ""}`}
            onClick={() => {
              if (selectedButton !== "owned") {
                setSelectedButton("owned");
              } else {
                setSelectedButton(null);
              }
            }}
          >
            View Owned Events
          </button>
        )}
      </div>
      <div className={mode === "view" ? "event-grid" : "event-edit-view"}>
        {filteredList.map((event) => (
          <div className="event-row" key={event.id}>
            <EventCard
              className="event-card"
              id={event.id}
              category={!selectedButton ? event.category : undefined}
              title={event.title}
              likes={event.likes}
              startDate={event.startDate}
              endDate={event.endDate && event.endDate}
              startTime={event.startTime}
              endTime={event.endTime}
              location={event.location}
              messages={event.messages}
              maxCapacity={event.maxCapacity}
              tags={event.tags}
              users={event.users}
            />
            {mode === "edit" && (
              <div className={`event-button-panel ${theme}-button-panel`}>
                {owner && event.owner.id === owner.id ? (
                  <>
                    <button
                      onClick={() =>
                        handleRemove(event.id, "delete", currentUserId, event.title)
                      }
                    >
                      <ImBin />
                    </button>
                    <button>
                      <HiPencil />
                    </button>{" "}
                  </>
                ) : (
                  <button>
                    <IoMdExit />
                  </button>
                )}
                <button>
                  <BiInfoCircle />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreList;
