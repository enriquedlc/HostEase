import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import "./MainSiteLayout.css";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../Components/NavBar";
import UserContext from "../../Context/UserContext";
import ThemeSwitcher from "../../Components/ThemeSwitcher/ThemeSwitcher";
import { UserContextValue } from "../../Types/Types";
import { ToastContainer } from "react-toastify";

const MainSiteLayout = (props: { context: UserContextValue | null }) => {
  const { context } = props;

  return (
    <section className={`general-section ${context?.theme}-theme`}>
      <ToastContainer newestOnTop={true} autoClose={2000} />
      <Navbar context={context} />
      <Outlet context={context} />
    </section>
  );
};

export default MainSiteLayout;
