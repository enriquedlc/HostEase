import React from "react";
import { Outlet } from "react-router-dom";
import './MainSiteLayout.css';
import 'react-toastify/dist/ReactToastify.css';

const MainSiteLayout = () => {
  return (
    <section className="general-section">
      <Outlet />
    </section>
  );
};

export default MainSiteLayout;
