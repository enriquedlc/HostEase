import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Theme, ThemeContextValue, UserProfile } from "../Types/Types";

import Home from "./Home/Home";
import ThemeProvider from "../Components/ThemeProvider";

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
  
  // const [userProfile, setUserProfile] = useState<UserProfile>(); // The UserProfile interface is not define yet if this comment still exists
  
  return (
    <ThemeProvider>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AppRouterProvider;
