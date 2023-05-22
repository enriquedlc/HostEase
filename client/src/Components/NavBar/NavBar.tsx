import { useContext } from "react";
import { HiUserGroup } from "react-icons/hi";
import { MdAssignmentAdd } from "react-icons/md";
import { RiHomeLine, RiProfileFill } from "react-icons/ri";
import { TbInputSearch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { HostEaseRoutes } from "../../Types/AppRoutes/HostEaseRoutes";
import "./NavBar.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { UserContextValue } from "../../Types/Types";

const NavBar = (prop : { context : UserContextValue | null }) => {

  const { context } = prop;

  const { pathname } = useLocation();

  return (
    <nav className={`navbar-body navbar-${context?.theme}`}>
      <div className="navbar-button-panel ">
        <div className={`${pathname === HostEaseRoutes.MainPage && "active"}-${context?.theme}`}>
          <RiHomeLine />
          <Link to={`${HostEaseRoutes.MainPage}`}>Main Screen</Link>
        </div>
        <div className={`${pathname === HostEaseRoutes.Explore && "active"}-${context?.theme}`}>
          <TbInputSearch />
          <Link to={`${HostEaseRoutes.Explore}`}>Explore</Link>
        </div>
        <div className={`${pathname.includes('/events/') && "active"}-${context?.theme}`}>
          <HiUserGroup />
          <Link to={`/events/${context?.user?.id}`}>My Events</Link>
        </div>
        <div className={`${pathname.includes('/profile/') && "active"}-${context?.theme}`}>
          <RiProfileFill />
          <Link to={`/profile/${context?.user?.id}`}>Profile</Link>
        </div>
        <div className="general-section-bottom">
          <ThemeSwitcher className={'navbar-switcher'}/>
        </div>
        <div className="general-section-bottom">
          <ThemeSwitcher className={'navbar-switcher'}/>
        </div>
      </div>
      {!pathname.includes(HostEaseRoutes.NewEvent) && <div className={`navbar-add-event ${""}`}>
        <MdAssignmentAdd />
        <Link to={`${HostEaseRoutes.NewEvent}`}>New Event</Link>
      </div>}
    </nav>
  );
};

export default NavBar;
