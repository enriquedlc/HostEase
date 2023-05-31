import { AiFillLike, AiFillTags } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { EventCard, Theme } from "../../../Types/Types";
import "../ProfileCards.css";

interface ProfileCardProps extends EventCard {
  theme?: Theme;
}

const ProfileEventCard = (props: ProfileCardProps) => {
  const navigate = useNavigate();

  const {
    id,
    title,
    category,
    tagsNumber,
    maxCapacity,
    users,
    likes,
    isOwner,
    theme,
  } = props;

  return (
    <div className={`profile-card-container ${theme}-card`}>
      <h3>{title}</h3>
      <p>{category}</p>
      <button
        className="check-event-button"
        onClick={() => navigate(`/event/${id}`)}
      >
        Check it Out !
      </button>
      <div className="profile-card-body">
        <div>
          <AiFillLike />
          <span>{likes}</span>
        </div>
        <div>
          <FaUsers />
          <span>{users}</span>/<span>{maxCapacity}</span>
        </div>
        <div>
          <AiFillTags/>
          <span>{tagsNumber}</span>
        </div>
      </div>
      {isOwner ? <div className="admin-flag">Admin</div> : <div className="member-flag">Member</div>}
    </div>
  );
};

export default ProfileEventCard;
