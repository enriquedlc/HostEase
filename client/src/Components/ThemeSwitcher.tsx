import React, { useContext } from "react";
import { Theme, UserContextValue } from "../Types/Types";
import { UserContext } from "../Context/UserContext";

const ThemeSwitcher = () => {

  const userContext = useContext<UserContextValue | null>(UserContext);

  const switchTheme = () => {
    userContext?.setTheme((current: Theme) =>
      current === "light" ? "dark" : "light"
    );
  };

  return (
    <button onClick={switchTheme}>
      {userContext?.theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeSwitcher;
