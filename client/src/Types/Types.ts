export type Theme = "light" | "dark";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: Function;
};

export interface UserProfile {
    username: string;
    lastName: string;
    theme: Theme;
};

