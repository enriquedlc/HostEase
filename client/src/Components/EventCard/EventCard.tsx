import React, { useContext } from "react";
import "./EventCard.css";
import { Category, LatLngLiteral, Tag, User } from "../../Types/Types";
import {
  AiFillLike,
  AiOutlineArrowRight,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { BsCalendarWeekFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import TagCard from "../TagCard";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Map from "../Map";

interface EventCardOptions {
  id: number;
  title?: string;
  category?: Category;
  likes?: number;
  startDate?: string;
  startTime?: string;
  endDate?: string | null;
  endTime?: string | null;
  location?: LatLngLiteral | null;
  tags?: Tag[];
  users?: number;
}

const EventCard = (props: EventCardOptions) => {
  const navigate = useNavigate();

  const userContext = useContext(UserContext);

  const {
    title,
    likes,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
    tags,
    users,
  } = props;

  const renderUsers = (users: number) => {
    if (users > 1000000) {
      return (users / 1000000).toFixed(1) + " M";
    } else if (users > 1000) {
      return (users / 1000).toFixed(0) + " K";
    }
    return users.toString();
  };

  const slicedTags = tags?.slice(0, 6);

  return (
    <div className={`card-body ${userContext?.theme}`}>
      <div className="map-side">{location && <Map name="map" coordinates={location} center mode="view" />}</div>
      <div className="content-side">
        <h1>{title}</h1>
        {slicedTags && (
          <div className="tags-container">
            {slicedTags?.map(({ tag, color }) => {
              return <TagCard text={tag} color={color} />;
            })}
            {slicedTags?.length > 6 && (
              <span> + {slicedTags?.length - 6} more</span>
            )}
          </div>
        )}
        <div className="row">
          {startDate && (
            <div>
              <BsCalendarWeekFill />
              {startDate} ~ {endDate}
            </div>
          )}
          {startTime && (
            <div>
              <AiOutlineClockCircle />
              {startTime} ~ {endTime}
            </div>
          )}
        </div>
        <div className="row">
          <div>
            <AiFillLike />
            <div>{likes}</div>
          </div>
        </div>
        <div className="view-event" onClick={() => navigate("/event/id")}>
          View Event
          <AiOutlineArrowRight />
        </div>
        <div className={`user-amount ${userContext?.theme}`}>
          {users && renderUsers(users)}
          <FaUsers />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
