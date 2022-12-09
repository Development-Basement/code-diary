import { useAuth } from "@contexts/authContext";
import { possibleThemes, ThemeContext } from "@contexts/themeContext";

import { FC, useContext } from "react";

const Sidebar: FC = () => {
  const { userData } = useAuth();
  const { setTheme } = useContext(ThemeContext);

  return (
    <div className="flex h-full w-64 flex-col bg-neutral p-3 text-neutral-content">
      <nav className="flex flex-col">
        <h2 className="text-3xl">Personal</h2>
        <span className="divider" />
        <h2 className="text-3xl">Teams</h2>
      </nav>
      <div id="themechange" className="mt-auto">
        <span className="divider" />
        <h2 className="mb-3 text-3xl">Themes: </h2>
        <span className="btn-group btn-group-vertical">
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
    </div>
  );
};

export default Sidebar;
