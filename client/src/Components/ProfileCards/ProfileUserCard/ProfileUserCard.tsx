import React from "react";
import "../ProfileCards.css";
import { GeneralMinimalistUserData, Theme } from "../../../Types/Types";
import { useNavigate } from "react-router-dom";
import user from "./assets/user.png"

interface ProfileCardProps extends GeneralMinimalistUserData {
  theme?: Theme;
}

const ProfileUserCard = ({
  userName,
  theme,
  userId,
}: ProfileCardProps) => {
  const navigate = useNavigate();

  return (
    <div className={`user-profile-card-container ${theme}-card`}>
      <h3>{userName}</h3>
      <img src={user} alt="User profile pic" className="user-card-profile-pic" />
      <button
        className="check-event-button"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        Visit Profile
      </button>
    </div>
  );
};

export default ProfileUserCard;
