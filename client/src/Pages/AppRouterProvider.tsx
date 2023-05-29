import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../Context/UserContext";
import AdminPageLayout from "../Layout/AdminPageLayout/AdminPageLayout";
import AuthPageLayout from "../Layout/AuthPageLayout";
import MainSiteLayout from "../Layout/MainSiteLayout";
import { HostEaseRoutes } from "../Types/AppRoutes/HostEaseRoutes";
import CategoryComponent from "./Admin/Components/CategoryComponent/CategoryComponent";
import EventComponent from "./Admin/Components/EventComponent/EventComponent";
import CategoryForm from "./Admin/Components/Forms/CategoryForm/CategoryForm";
import TagFrom from "./Admin/Components/Forms/TagForm/TagFrom";
import MainDashboard from "./Admin/Components/MainDashboard/MainDashboard";
import TagComponent from "./Admin/Components/TagComponent/TagComponent";
import UserComponent from "./Admin/Components/UserComponent/UserComponent";
import LogInto from "./Error/LogInto";
import NotFound from "./Error/NotFound";
import EventProfile from "./EventProfile/EventProfile";
import Explore from "./Explore/Explore";
import FormEvent from "./FormEvent";
import Home from "./Home";
import Login from "./Login";
import MainPage from "./MainPage";
import MyEvents from "./MyEvents";
import SignUp from "./SignUp";
import UserProfile from "./UserProfile/UserProfile";

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
          <>
            <Route element={<MainSiteLayout context={userContext} />}>
              <Route path={HostEaseRoutes.MainPage} element={<MainPage />} />
              <Route path={HostEaseRoutes.Explore} element={<Explore />} />
              <Route path={HostEaseRoutes.MyEvents} element={<MyEvents />} />
              <Route path={HostEaseRoutes.EventProfile} element={<EventProfile />} />
              <Route
                path={`${HostEaseRoutes.NewEvent}`}
                element={<FormEvent />}
              />
              <Route path={`${HostEaseRoutes.EditEvent}`} element={<FormEvent />} />
              <Route path={`${HostEaseRoutes.Profile}`} element={<UserProfile />} />
            </Route>
            {userContext?.user?.role === "ADMIN" && (
              <Route element={<AdminPageLayout />}>
                <Route path={HostEaseRoutes.Admin} element={<MainDashboard />} />
                <Route path={HostEaseRoutes.AdminEvents} element={<EventComponent />} />
                <Route path={HostEaseRoutes.AdminUsers} element={<UserComponent />} />
                <Route path={HostEaseRoutes.AdminTags} element={<TagComponent />} />
                <Route path={`${HostEaseRoutes.AdminTags}/create`} element={<TagFrom />} />
                <Route path={`${HostEaseRoutes.AdminTags}/update/:id`} element={<TagFrom />} />
                <Route path={HostEaseRoutes.AdminCategories} element={<CategoryComponent />} />
                <Route path={`${HostEaseRoutes.AdminCategories}/create`} element={<CategoryForm />} />
                <Route path={`${HostEaseRoutes.AdminCategories}/update/:id`} element={<CategoryForm />} />
                {/* <Route path={HostEaseRoutes.AdminComments} element={<AdminPageLayout />} /> */}
              </Route>
            )}
            <Route element={<MainSiteLayout context={userContext} />}>
              <Route path={HostEaseRoutes.MainPage} element={<MainPage />} />
              <Route path={HostEaseRoutes.Explore} element={<Explore />} />
              <Route path={HostEaseRoutes.MyEvents} element={<MyEvents />} />
              <Route
                path={`${HostEaseRoutes.NewEvent}`}
                element={<FormEvent />}
              />
            </Route>
          </>
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
