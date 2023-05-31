import React from "react";
import { Link } from "react-router-dom";
import { HostEaseRoutes } from "../../../Types/AppRoutes/HostEaseRoutes";
import { MdOutlineError } from "react-icons/md";

const LogInto = () => {
  return (
    <div>
      <p className="error-message">You need to Log In <Link to={HostEaseRoutes.Login}>here</Link></p>
    </div>
  );
};

export default LogInto;
