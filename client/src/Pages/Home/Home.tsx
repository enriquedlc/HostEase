import { useContext } from "react";
import { ThemeContextValue } from "../../Types/Types";

import { Link } from "react-router-dom";

import HostEaseLogo from "../../assets/HostEase.png";

import CustomCarrousel from "../../Components/CustomCarrousel/CustomCarrousel";
import { ThemeContext } from "../../Components/ThemeProvider";
import ThemeSwitcher from "../../Components/ThemeSwitcher";
import "./Home.css";

const Home = () => {
  const themeContext = useContext<ThemeContextValue | null>(ThemeContext);

  return (
    <section className="home-section">
      <nav className={`home-top-bar ${themeContext?.theme}-top-bar`}>
        <div className={`top-bar-company`}>
          <img src={HostEaseLogo} className={`hostease-logo`} />
          <div className={`${themeContext?.theme}-theme-font`}>HostEase</div>
        </div>
        <div className={`top-bar-button-panel`}>
          <Link to="/" className="featured">
            Create an event
          </Link>
          <Link to="/login" className={`${themeContext?.theme}-theme-font`}>
            Log In
          </Link>
          <Link to="/sign" className={`${themeContext?.theme}-theme-font`}>
            Sign In
          </Link>
          <ThemeSwitcher />
        </div>
      </nav>
      <div className={`home-body ${themeContext?.theme}-home-body`}>
        <div className="home-presentation-section">
          <div className={`home-presentation ${themeContext?.theme}-presentation`}>
            <div className={`home-presentation-title ${themeContext?.theme}-presentation-title`}>
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
