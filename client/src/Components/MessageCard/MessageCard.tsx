import React, { useState } from "react";
import "./MessageCard.css";
import { MdVerified } from "react-icons/md";
import { ShortUser, Theme } from "../../Types/Types";
import { formatDate, formatHour } from "../../services/Utils/main.utils";
import { CgProfile } from "react-icons/cg";

const MessageCard = ({
  nickname,
  isOwner,
  message,
  time,
  theme,
}: {
  nickname: string;
  isOwner: boolean;
  message: string;
  time: Date;
  theme: Theme;
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div className={`msg-container ${theme}-msg-container`}>
      <div className="msg-user">
        {nickname}{" "}
        {isOwner && (
          <MdVerified
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        )}
        {isOwner && showTooltip && (
          <span className="msg-tooltip">
            Esta persona es el administrador del evento
          </span>
        )}
      </div>
      <div className="msg-text">{message}</div>
      <div className="msg-timestamp">
        {formatDate(time.toUTCString())} - {formatHour(time)}
      </div>
    </div>
  );
};

export default MessageCard;
