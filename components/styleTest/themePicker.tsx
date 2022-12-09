import { possibleThemes, ThemeContext } from "@contexts/themeContext";

import { useContext } from "react";

const ThemePicker = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div className="absolute bottom-0 left-0 right-0 flex w-screen justify-center">
      <span className="btn-group btn-group-horizontal">
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
