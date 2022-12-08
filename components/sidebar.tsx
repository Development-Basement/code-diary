import { useAuth } from "@contexts/authContext";
import { possibleThemes, ThemeContext } from "@contexts/themeContext";
import { FC, useContext } from "react";

const Sidebar: FC = () => {
  const { userData } = useAuth();
  const { setTheme } = useContext(ThemeContext);

  return (
    <nav className="h-screen w-64 bg-neutral p-3 text-neutral-content">
      <h2 className="text-3xl">Personal</h2>
      <div className="divider" />
      <h2 className="text-3xl">Teams</h2>
      <div id="themechange">
        <h3 className="text-2xl">Themes: </h3>
        {possibleThemes.map((theme) => (
          <>
            <button
              key={theme}
              onClick={() => {
                setTheme(theme);
              }}
              className="btn-secondary btn-sm btn"
            >
              {theme}
            </button>
            <br />
          </>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
