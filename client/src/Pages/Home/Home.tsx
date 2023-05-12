import React, { useContext } from "react";
import { Theme, UserContextValue } from "../../Types/Types";

import { Link } from "react-router-dom";

import HostEaseLogo from "../../assets/HostEase.png";

import "./Home.css";
import { UserContext } from "../../Context/UserContext";
import CustomCarrousel from "../../Components/CustomCarrousel/CustomCarrousel";
import ThemeSwitcher from "../../Components/ThemeSwitcher";
import { HostEaseRoutes } from "../../Types/AppRoutes/HostEaseRoutes";
import "./Home.css";

const Home = () => {
  const userContext = useContext<UserContextValue | null>(UserContext);

  return (
    <section className="home-section">
      <nav className={`home-top-bar ${userContext?.theme}-top-bar`}>
        <div className={`top-bar-company`}>
          <img src={HostEaseLogo} className={`hostease-logo`} />
          <div className={`${userContext?.theme}-theme-font`}>HostEase</div>
        </div>
        <div className={`top-bar-button-panel`}>
          <Link to={HostEaseRoutes.Home} className="featured">
            Create an event
          </Link>
          {userContext?.user ? (
            <>
              <Link to="/home">Go to Home</Link>
              <a onClick={userContext.logOut}>Log Out</a>
            </>
          ) : (
            <>
              <Link to="/login" className={`${userContext?.theme}-theme-font`}>
                Log In
              </Link>
              <Link to="/sign" className={`${userContext?.theme}-theme-font`}>
                Sign In
              </Link>{" "}
            </>
          )}
          <ThemeSwitcher />
        </div>
      </nav>
      <div className={`home-body ${userContext?.theme}-home-body`}>
        <div className="home-presentation-section">
          <div
            className={`home-presentation ${userContext?.theme}-presentation`}
          >
            <div
              className={`home-presentation-title ${userContext?.theme}-presentation-title`}
            >
              <h2>Follow</h2>
              <h1>your passion!</h1>
            </div>
          </div>
          <CustomCarrousel className="home-carousel" />
        </div>
      </div>
    </section>
  );
};

export default Home;
