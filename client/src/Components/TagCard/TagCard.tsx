import React from "react";
import "./TagCard.css";

const TagCard = (props: {
  color: string;
  text: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: React.CSSProperties;
}) => {
  const { color, text, style, onClick } = props;

  return (
    <div className="tag-body" onClick={onClick} style={style}>
      <div className="tag-color" style={{ backgroundColor: color }} />
      <div className="tag-text">{text}</div>
    </div>
  );
};

export default TagCard;
