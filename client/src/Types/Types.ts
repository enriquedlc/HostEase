export type Theme = "light" | "dark";

export interface ThemeContextValue {
    theme: Theme;
    setTheme: Function;
};

export interface UserProfile {
    username: string;
    last_name: string;
    theme: Theme;
};

