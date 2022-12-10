import { possibleThemes, ThemeContext } from "@contexts/themeContext";

import { useContext } from "react";

const ThemePicker = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex w-screen justify-center">
      <span className="btn-group-horizontal btn-group">
        {possibleThemes.map((theme) => (
          <button
            key={theme}
            onClick={() => {
              setTheme(theme);
            }}
            className="btn btn-secondary btn-sm"
          >
            {theme}
          </button>
        ))}
      </span>
    </div>
  );
};

export default ThemePicker;
