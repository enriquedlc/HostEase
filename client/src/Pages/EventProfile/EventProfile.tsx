import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import {
  EventProfileInfo,
  HostEaseEvent,
  Message,
  UserContextValue,
} from "../../Types/Types";
import {
  fetchInfoFromEvent,
  likeInteraction,
  userOnEvent,
} from "../../services/main.services";
import Loading from "../../Components/Loading/Loading";
import Map from "../../Components/Map/Map";
import "./EventProfile.css";
import {
  AiFillLike,
  AiOutlineClockCircle,
  AiOutlineLike,
} from "react-icons/ai";
import TagCard from "../../Components/TagCard/TagCard";
import { BsCalendarWeekFill, BsPeopleFill } from "react-icons/bs";
import { toast } from "react-toastify";

interface UserMessage {
  message: string;
}

const EventProfile = () => {
  const userContext = useOutletContext<UserContextValue>();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<HostEaseEvent | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<UserMessage>();
  const [like, setLike] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    const retrieveDataFormEvent = (eventId: number, userId: number) => {
      fetchInfoFromEvent(eventId, userId).then((response) => {
        console.log(response.data);
        if (response.data.data) {
          const info: EventProfileInfo = response.data.data;
          setJoined(info.joined);
          setEvent(info.event);
          setLike(info.liked);
        } else {
        }
      });
      setLoading(false);
    };

    id &&
      userContext.user &&
      retrieveDataFormEvent(parseInt(id), userContext.user?.id);
  }, []);

  const handleLike = () => {
    setLike((prevLike) => !prevLike);
    userContext.user &&
      id &&
      likeInteraction(userContext.user?.id, parseInt(id)).then((response) => {
        setEvent((prevEvent) => {
          if (prevEvent) {
            const newLikes = response.data.data
              ? prevEvent.likes + 1
              : prevEvent.likes - 1;
            return { ...prevEvent, likes: newLikes };
          }
          return prevEvent;
        });
      });
  };

  const handleJoin = () => {
    if (event?.maxCapacity) {
      if (event?.users < event?.maxCapacity) {
        setJoined((prevJoined) => !prevJoined);
        userContext.user &&
          id &&
          userOnEvent(parseInt(id), userContext.user?.id).then((response) => {
            console.log(response.data.data);
            setEvent((prevEvent) => {
              if (prevEvent) {
                const newUsers = response.data.data
                  ? prevEvent.users + 1
                  : prevEvent.users - 1;
                return { ...prevEvent, users: newUsers };
              }
              return prevEvent;
            });
          });
      } else {
        if (!toast.isActive("cantJoinMessage")) {
          toast.error("¡El evento está lleno!", {
            toastId: "cantJoinMessage",
            theme: userContext?.theme,
          });
        }
      }
    }
  };

  const limitDescLength = (text?: string) => {
    const CHAR_LIMIT = 70;
    if (text) {
      if (text?.length > CHAR_LIMIT) {
        return text?.substring(0, CHAR_LIMIT) + " ...";
      }

      return text;
    }
  };

  const renderUsers = (number?: number) => {
    if (number) {
      if (number > 1000000) {
        return (number / 1000000).toFixed(1) + " M";
      } else if (number > 1000) {
        return (number / 1000).toFixed(0) + " K";
      }
      return number.toString();
    }
  };

  return (
    <>
      {loading ? (
        <Loading theme={userContext.theme} />
      ) : (
        <div className="event-profile-container">
          <div className={`event-profile-banner ${userContext.theme}-banner`}>
            {event && (
              <Map
                mode="view"
                zoom={10}
                center
                name="event-map"
                coordinates={event?.location}
              />
            )}

            <div className="banner-title">
              <div>
                <h1>{event?.title}</h1>
                <h3>{event?.category?.categoryName}</h3>
              </div>
              <div className="profile-user-amount">
                <span>
                  {renderUsers(event?.users)} -{" "}
                  {renderUsers(event?.maxCapacity)}
                  <BsPeopleFill />
                </span>
              </div>
            </div>
            <div className="profile-button-panel">
              {event?.owner.id !== userContext.user?.id && (
                <button
                  className={`${
                    event?.maxCapacity && (event?.users === event?.maxCapacity)
                      ? "disabled-join"
                      : ""
                  }`}
                  onClick={handleJoin}
                >
                  {joined ? "Leave" : "Join"}
                </button>
              )}
              <button
                id="like"
                className={like ? "active-like" : ""}
                onClick={handleLike}
              >
                {renderUsers(event?.likes)}
                {like ? <AiFillLike /> : <AiOutlineLike />}
              </button>
            </div>
          </div>
          <div
            className={`event-profile-body ${userContext.theme}-event-profile`}
          >
            <div className="event-profile-col">
              <div className="event-profile-description">
                <h4>Description: </h4>
                <div className="description">
                  {limitDescLength(event?.description)}
                </div>
              </div>
              <div className="event-profile-general-info">
                <span>
                  <BsCalendarWeekFill />
                  {event?.startDate} ~ {event?.endDate}
                </span>
                <span>
                  <AiOutlineClockCircle />
                  {event?.startTime} ~ {event?.endTime}
                </span>
              </div>
              <div className="profile-tag-panel">
                <h5>Tags</h5>
                <div className="body-tag-panel">
                  {event?.tags?.map(({ id, tag, color }) => {
                    return <TagCard key={id} text={tag} color={color} />;
                  })}
                </div>
              </div>
            </div>
            <div className="event-profile-col"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventProfile;
