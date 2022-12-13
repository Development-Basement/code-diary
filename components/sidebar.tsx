import { useAuth } from "@contexts/authContext";
import { possibleThemes, ThemeContext } from "@contexts/themeContext";

import { FC, useContext } from "react";

import { Add } from "@mui/icons-material";

const Sidebar: FC = () => {
  const { userData } = useAuth();
  const { setTheme } = useContext(ThemeContext);

  const addNewTeamHandle = () => {
    console.log("Adding new team..."); // REMOVE LATER
  };

  const addNewCategoryHandle = () => {
    console.log("Adding new category..."); // REMOVE LATER
  };

  return (
    <div className="flex h-full w-64 flex-col bg-neutral p-3 text-neutral-content">
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add new Note</h3>
        </label>
      </label>

      <nav className="flex flex-col">
        <div className="mb-8 flex h-min w-full flex-col">
          <span className="flex flex-row items-center justify-between">
            <h2 className="text-3xl">Teams</h2>
            <Add
              className="hover:cursor-pointer hover:opacity-70"
              onClick={() => {
                addNewTeamHandle();
              }}
            ></Add>
          </span>
          <span className="my-2 h-1 w-full bg-base-100" />
          <h3 className="text-2xl">Personal</h3>
        </div>
        <div className="mb-8 flex h-min w-full flex-col">
          <span className="flex flex-row items-center justify-between">
            <h2 className="text-3xl">Categories</h2>
            <Add
              className="hover:cursor-pointer hover:opacity-70"
              onClick={() => {
                addNewCategoryHandle();
              }}
            ></Add>
          </span>
          <span className="my-2 h-1 w-full bg-base-100" />
        </div>
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
