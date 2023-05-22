import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../Context/UserContext";
import AuthPageLayout from "../Layout/AuthPageLayout";
import MainSiteLayout from "../Layout/MainSiteLayout";
import { HostEaseRoutes } from "../Types/AppRoutes/HostEaseRoutes";
import LogInto from "./Error/LogInto";
import NotFound from "./Error/NotFound";
import Explore from "./Explore/Explore";
import Home from "./Home";
import Login from "./Login";
import MainPage from "./MainPage";
import FormEvent from "./FormEvent";
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

  return (
    <BrowserRouter basename={HostEaseRoutes.Home}>
      <Routes>
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