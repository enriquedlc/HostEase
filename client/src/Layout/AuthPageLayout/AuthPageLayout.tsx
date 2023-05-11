import React from "react";
import { Outlet } from "react-router-dom";
import "./AuthPageLayout.css";
import { ToastContainer } from 'react-toastify';


const AuthPageLayout = () => {
  return (
    <section className="authform-section">
      <ToastContainer newestOnTop={true} autoClose={2000}/>
      <Outlet />
    </section>
  );
};

export default AuthPageLayout;
