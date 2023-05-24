import React, { useState } from "react";
import "./MessageCard.css";
import { MdVerified } from "react-icons/md";
import { ShortUser, Theme } from "../../Types/Types";
import { formatDate, formatHour } from "../../services/Utils/main.utils";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const MessageCard = ({
  userId,
  nickname,
  isOwner,
  message,
  time,
  theme,
  sender
}: {
  userId?: number;
  nickname: string;
  isOwner: boolean;
  message: string;
  time: Date;
  theme: Theme;
  sender: boolean;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={`msg-container ${theme}-msg-container ${sender ? 'sender' : ''}`}>
      <div className="msg-user" onClick={() => userId && navigate(`/profile/${userId}`)}>
        {nickname}
        {isOwner && (
          <MdVerified
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
        {sender ? ' ( You )' : ''}
      </div>
      <div className="msg-text">{message}</div>
      <div className="msg-timestamp">
        {formatDate(time.toUTCString())} - {formatHour(time)}
      </div>
    </div>
  );
};

export default MessageCard;
