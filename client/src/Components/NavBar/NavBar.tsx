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

const NavBar = (prop: { context: UserContextValue | null }) => {
  const { context } = prop;

  const { pathname } = useLocation();

  return (
    <nav className={`navbar-body navbar-${context?.theme}`}>
      <div className="navbar-button-panel ">
        <div
          className={`${pathname === HostEaseRoutes.MainPage && "active"}-${
            context?.theme
          }`}
        >
          <Link to={`${HostEaseRoutes.MainPage}`}>
            <RiHomeLine />
            <span className="bannish">Main Screen</span>
          </Link>
        </div>
        <div
          className={`${pathname === HostEaseRoutes.Explore && "active"}-${
            context?.theme
          }`}
        >
          <Link to={`${HostEaseRoutes.Explore}`}>
            <TbInputSearch />
            <span className="bannish">Explore</span>
          </Link>
        </div>
        <div
          className={`${pathname.includes("/events/") && "active"}-${
            context?.theme
          }`}
        >
          <Link to={`/events/${context?.user?.id}`}>
            <HiUserGroup />
            <span className="bannish">My Events</span>
          </Link>
        </div>
        <div
          className={`${pathname.includes(`/profile/${context?.user?.id}`) && "active"}-${
            context?.theme
          }`}
        >
          <Link to={`/profile/${context?.user?.id}`}>
            <RiProfileFill />
            <span className="bannish">Profile</span>
          </Link>
        </div>
        <div className="general-section-bottom">
          <ThemeSwitcher className={"navbar-switcher"} />
        </div>
      </div>
      {!pathname.includes(HostEaseRoutes.NewEvent) && (
        <div className={`navbar-add-event ${""}`}>
          <MdAssignmentAdd />
          <Link to={`${HostEaseRoutes.NewEvent}`}>New Event</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
