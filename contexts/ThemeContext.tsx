import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

export type Theme =
  | "forest"
  | "dracula"
  | "saphire"
  | "light"
  | "halloween"
  | "dark"
  | "synthwave"
  | "black"
  | "luxury"
  | "business"
  | "night"
  | "coffee";

export const DEFAULT_THEME: Theme = "halloween";

const useCustomEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;
// for SOME reason, the undefined has to be a string
// to not give warning about using useEffect on the server
// :shrug:

export type ThemeContextProps = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: DEFAULT_THEME,
  setTheme: () => {},
});

export const ThemeContextProvider = ({
  value = DEFAULT_THEME,
  children,
}: {
  value: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(value);

  useCustomEffect(() => {
    const storeTheme = localStorage.getItem("theme") as Theme | null;
    applyTheme(storeTheme || DEFAULT_THEME);
  }, []);

  /**
   * Apply theme to 'html' tag on DOM.
   */
  const applyTheme = (theme: Theme = DEFAULT_THEME) => {
    const html = document.getElementsByTagName("html")[0];
    localStorage.setItem("theme", theme);
    html.setAttribute("data-theme", theme);
  };

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    applyTheme(theme);
  };

  /**
   * Current context value for theme.
   */
  const val = {
    theme,
    setTheme: handleThemeChange,
  };

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};
