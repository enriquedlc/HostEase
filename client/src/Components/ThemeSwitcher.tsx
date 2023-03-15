import React, { useContext } from "react";
import { Theme, ThemeContextValue } from "../Types/Types";
import { ThemeContext } from "./ThemeProvider";

const ThemeSwitcher = () => {

  const themeContext = useContext<ThemeContextValue | null>(ThemeContext);

  const switchTheme = () => {
    themeContext?.setTheme((current: Theme) =>
      current === "light" ? "dark" : "light"
    );
  };

  return (
    <button onClick={switchTheme}>
      {themeContext?.theme === "light" ? "Dark Mode" : "Light Mode"}
    </button>
  );
};

export default ThemeSwitcher;
