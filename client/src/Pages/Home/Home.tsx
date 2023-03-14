import React, { useContext } from "react";
import { Theme, ThemeContextValue } from "../../Types/Types";

import { Link } from "react-router-dom";

import HostEaseLogo from "../../assets/HostEase.png";

import "./Home.css"
import { ThemeContext } from "../../Components/ThemeProvider";

const Home = () => {

  const themeContext = useContext<ThemeContextValue | null>(ThemeContext);

  const switchTheme = () => {
    themeContext?.setTheme((current : Theme) => current === 'light' ? "dark" : "light")
  }
 
  return (
    <section className="home-section">
      <nav className={`home-top-bar ${themeContext?.theme}-top-bar`}>
        <div className={`top-bar-company`}>
          <img src={HostEaseLogo} className={`hostease-logo`}/>
          <div className={`${themeContext?.theme}-theme-font`}>HostEase</div>
        </div>
        <div className={`top-bar-button-panel`}>
            <Link to="/" className="featured">Create an event</Link>
            <Link to="/" className={`${themeContext?.theme}-theme-font`}>Log In</Link>
            <Link to="/" className={`${themeContext?.theme}-theme-font`}>Sign In</Link>
            <button onClick={switchTheme}>{themeContext?.theme === 'light' ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
      </nav>
      <div className="home-body">
        Esto es para el Body
      </div>
    </section>
  );
};

export default Home;
