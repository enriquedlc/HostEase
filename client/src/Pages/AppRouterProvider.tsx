import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import AdminContext from "../Context/AdminContext";
import UserContext from "../Context/UserContext";
import AuthPageLayout from "../Layout/AuthPageLayout";
import MainSiteLayout from "../Layout/MainSiteLayout";
import { HostEaseRoutes } from "../Types/AppRoutes/HostEaseRoutes";
import MainDashboard from "./Admin/Components/MainDashboard/MainDashboard";
import RightSide from "./Admin/Components/RightSide/RightSide";
import Sidebar from "./Admin/Components/Sidebar/Sidebar";
import AdminPageLayout from "./Admin/Dashboard";
import EventPage from "./Admin/Pages/Event/EventPage";
import LogInto from "./Error/LogInto";
import NotFound from "./Error/NotFound";
import Explore from "./Explore/Explore";
import FormEvent from "./FormEvent";
import Home from "./Home";
import Login from "./Login";
import MainPage from "./MainPage";
import MyEvents from "./MyEvents";
import SignUp from "./SignUp";

/**
 *
 * The Skeleton of the App. This side its made for the Routing section of HostEase
 * it brings all the Routes and the profile data in case that the user has or not
 * submited the data.
 *
 * The App will react for both cases, Logged users and not Logged.
 *
 */

const AppRouterProvider = () => {
  const userContext = useContext(UserContext);
  const adminContext = useContext(AdminContext);

  return (
    <BrowserRouter basename={HostEaseRoutes.Home}>
      <Routes>
        <Route path={HostEaseRoutes.Admin} element={<AdminPageLayout sidebar={<Sidebar />} mainDashboard={<MainDashboard />} rightSide={<RightSide />} context={adminContext} />} />
        <Route path={HostEaseRoutes.AdminEvents} element={<AdminPageLayout sidebar={<Sidebar />}  mainDashboard={<EventPage />} rightSide={<RightSide />} context={adminContext} />} />
        {/* <Route path={HostEaseRoutes.AdminUsers} element={<AdminPageLayout />} /> */}
        {/* <Route path={HostEaseRoutes.AdminTags} element={<AdminPageLayout />} /> */}
        {/* <Route path={HostEaseRoutes.AdminCategories} element={<AdminPageLayout />} /> */}
        {/* <Route path={HostEaseRoutes.AdminComments} element={<AdminPageLayout />} /> */}
        <Route
          path={HostEaseRoutes.Home}
          element={<Home context={userContext} />}
        />
        <Route element={<AuthPageLayout context={userContext} />}>
          <Route path={HostEaseRoutes.Login} element={<Login />} />
          <Route path={HostEaseRoutes.Sign} element={<SignUp />} />
        </Route>
        {userContext?.user && (
          <Route element={<MainSiteLayout context={userContext} />}>
            <Route path={HostEaseRoutes.MainPage} element={<MainPage />} />
            <Route path={HostEaseRoutes.Explore} element={<Explore />} />
            <Route path={HostEaseRoutes.MyEvents} element={<MyEvents />} />
            <Route
              path={`${HostEaseRoutes.NewEvent}`}
              element={<FormEvent />}
            />
          </Route>
        )}
        {/* Hay que convertir este trozo en un componente que detecte los enlaces */}
        <Route
          path="*"
          element={userContext?.user ? <NotFound /> : <LogInto />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouterProvider;