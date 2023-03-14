import React, { ReactElement, createContext, useState } from 'react'
import { Theme, ThemeContextValue } from '../Types/Types';

let switchTheme = () => {};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children } : { children : ReactElement }) => {

    const [theme, setTheme] = useState<Theme>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider