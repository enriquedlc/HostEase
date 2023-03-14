import React, { useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { Theme } from "../Types/Types";

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

  // const ThemeContext = React.createContext<Theme>("light");

  // const [userProfile, setUserProfile] = useState<UserProfile>(); The UserProfile interface is not define yet if this comment still exists

  return (
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  );
};

export default AppRouterProvider;
