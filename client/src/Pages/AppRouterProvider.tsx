import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home";
import Login from "./Login";
import ThemeProvider from "../Context/UserContext";
import AuthPageLayout from "../Layout/AuthPageLayout";
import SignUp from "./SignUp/SignUp";
import UserProvider from "../Provider/UserProvider";

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
  return (
    <UserProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<AuthPageLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sign" element={<SignUp />} />
          </Route>
          <Route path="*" element={<p>Error 404</p>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default AppRouterProvider;
