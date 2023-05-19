import { useContext } from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdAssignmentAdd } from "react-icons/md";
import { RiHomeLine, RiProfileFill } from "react-icons/ri";
import { TbInputSearch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import { HostEaseRoutes } from "../../Types/AppRoutes/HostEaseRoutes";
import "./NavBar.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

const NavBar = () => {
  const userContext = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <nav className={`navbar-body navbar-${userContext?.theme}`}>
      <div className="navbar-button-panel ">
        <div
          className={`${pathname === HostEaseRoutes.MainPage && "active"}-${
            userContext?.theme
          }`}
        >
          <RiHomeLine />
          <Link to="/dashboard">Main Screen</Link>
        </div>
        <div
          className={`${pathname === HostEaseRoutes.Explore && "active"}-${
            userContext?.theme
          }`}
        >
          <TbInputSearch />
          <Link to="/explore">Explore</Link>
        </div>
        <div
          className={`${pathname === HostEaseRoutes.MyEvents && "active"}-${
            userContext?.theme
          }`}
        >
          <HiUserGroup />
          <Link to={`/user/events/${userContext?.user?.id}`}>My Events</Link>
        </div>
        <div
          className={`${pathname === HostEaseRoutes.Profile && "active"}-${
            userContext?.theme
          }`}
        >
          <RiProfileFill />
          <Link to={`/user/profile/${userContext?.user?.id}`}>Profile</Link>
        </div>
        <div className="general-section-bottom">
          <ThemeSwitcher />
        </div>
      </div>
      <div className={`navbar-add-event ${""}`}>
        <MdAssignmentAdd />
        <Link to="/new">New Event</Link>
      </div>
    </nav>
  );
};

export default NavBar;
