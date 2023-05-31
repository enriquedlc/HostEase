import React from "react";
import ReactDOM from "react-dom/client";
import AppRouterProvider from "./Pages/AppRouterProvider";
import "./index.css";
import UserProvider from "./Provider/UserProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <AppRouterProvider />
    </UserProvider>
  </React.StrictMode>
);
