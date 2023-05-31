import React from "react";
import { Theme } from "../../Types/Types";
import { Outlet } from "react-router-dom";
import { MdOutlineError } from "react-icons/md";
import './ErrorLayout.css'


const ErrorLayout = ({ theme }: { theme?: Theme }) => {
  return (
    <section className={`error-background ${theme}-error-background-color`}>
      <MdOutlineError />
      <Outlet />
    </section>
  );
};

export default ErrorLayout;
