import { createContext, useEffect, useLayoutEffect, useState } from "react";

export const possibleThemes = [
  "sapphire",
  "halloween",
  "dark",
  "synthwave",
  "luxury",
  "night",
  "coffee",
  "forest",
  "dracula",
] as const;

export type Theme = typeof possibleThemes[number];

export const DEFAULT_THEME: Theme = "sapphire";

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
  value?: Theme;
  children: JSX.Element;
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
