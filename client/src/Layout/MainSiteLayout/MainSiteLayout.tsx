import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import './MainSiteLayout.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../Components/NavBar";
import UserContext from "../../Context/UserContext";
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher";

const MainSiteLayout = () => {

  const userContext = useContext(UserContext);

  return (
    <section className={`general-section ${userContext?.theme}-theme`}>
      <Navbar/>
      <Outlet/>
      <div className="general-section-bottom">
        <ThemeSwitcher />
      </div>
    </section>
  );
};

export default MainSiteLayout;
