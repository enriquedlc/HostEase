import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import './MainSiteLayout.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../../Components/NavBar";
import UserContext from "../../Context/UserContext";
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher";
import { UserContextValue } from "../../Types/Types";

const MainSiteLayout = (props : { context : UserContextValue | null }) => {

  const { context } = props;

  return (
    <section className={`general-section ${context?.theme}-theme`}>
      <Navbar context={context}/>
      <Outlet context={context}/>
      <div className="general-section-bottom">
        <ThemeSwitcher />
      </div>
    </section>
  );
};

export default MainSiteLayout;
