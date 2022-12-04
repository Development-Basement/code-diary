import React, { createContext, useMemo, useState } from "react";
import useCustomEffect from "@hooks/useCustomEffect.hook";

// ENHANCE: a way easier hook, using Next's <Html> component\
// (instead of document.getElementsByTagName())

export type ThemeContextProps = {
  theme: string;
  setTheme: (theme: string) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: "default",
  setTheme: () => {},
});

export const ThemeContextProvider = ({
  value = "default",
  children,
}: {
  value?: string;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState(value);

  useCustomEffect(() => {
    const storeTheme = localStorage.getItem("theme");
    applyTheme(storeTheme || "default");
  }, []);

  /**
   * Apply theme to 'html' tag on DOM.
   */
  const applyTheme = (theme = "default") => {
    const html = document.getElementsByTagName("html")[0];
    localStorage.setItem("theme", theme);
    html.setAttribute("data-theme", theme);
  };

  const handleThemeChange = (theme: string) => {
    setTheme(theme);
    applyTheme(theme);
  };

  /**
   * Current context value for theme.
   */
  const val = useMemo(
    () => ({
      theme,
      setTheme: handleThemeChange,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme],
  );

  return <ThemeContext.Provider value={val}>{children}</ThemeContext.Provider>;
};
