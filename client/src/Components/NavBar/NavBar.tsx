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
          <Link to="/dashboard">Main Screen</Link>
        </div>
        <div className={`${pathname === HostEaseRoutes.Explore && "active"}-${context?.theme}`}>
          <TbInputSearch />
          <Link to="/explore">Explore</Link>
        </div>
        <div className={`${pathname === HostEaseRoutes.MyEvents && "active"}-${context?.theme}`}>
          <HiUserGroup />
          <Link to={`/user/events/${context?.user?.id}`}>My Events</Link>
        </div>
        <div className={`${pathname === HostEaseRoutes.Profile && "active"}-${context?.theme}`}>
          <RiProfileFill />
          <Link to={`/user/profile/${context?.user?.id}`}>Profile</Link>
        </div>
      </div>
      {!pathname.includes(HostEaseRoutes.NewEvent) && <div className={`navbar-add-event ${""}`}>
        <MdAssignmentAdd />
        <Link to={`${HostEaseRoutes.NewEvent}/${context?.user?.id}`}>New Event</Link>
      </div>}
    </nav>
  );
};

export default NavBar;
