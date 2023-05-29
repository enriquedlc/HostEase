import React from "react";
import { FaSpinner } from "react-icons/fa";
import './Loading.css'
import { Theme } from "../../Types/Types";

const Loading = ({ theme } : { theme ?: Theme }) => {
  return (
    <div className={`loading-container ${theme}-loading`}>
      <FaSpinner className="loading-icon" />
    </div>
  );
};

export default Loading;
