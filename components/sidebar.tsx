import { useAuth } from "@contexts/authContext";
import { possibleThemes, ThemeContext } from "@contexts/themeContext";

import { useRef, useState } from "react";

import { FC, useContext } from "react";

import { Add } from "@mui/icons-material";

import MoreVertIcon from "@mui/icons-material/MoreVert";

type categoryObjType = {
  name: string;
  color: string;
};

const Sidebar: FC = () => {
  const { userData } = useAuth();
  const { setTheme } = useContext(ThemeContext);

  const [addNewModal, setAddNewModal] = useState<boolean>(false);
  const [addNewTeamModal, setAddNewTeamModal] = useState<boolean>(false);

  const [categories, setCategories] = useState<categoryObjType[]>([
    { name: "test", color: "red" },
    { name: "test 2", color: "blue" },
  ]);

  const categoryNameRef = useRef<HTMLInputElement>(null);
  const categoryColorRef = useRef<HTMLInputElement>(null);
  const teamNameRef = useRef<HTMLInputElement>(null);

  const addNewTeamHandle = () => {
    setAddNewTeamModal(true);
  };

  const addNewCategoryHandle = () => {
    setAddNewModal(true);
  };

  const resetAddNewCategoryValues = () => {
    if (categoryColorRef.current?.value && categoryNameRef.current?.value) {
      categoryNameRef.current.value = "";
      categoryColorRef.current.value = "";
    }
  };

  const resetAddNewTeamValues = () => {
    if (teamNameRef.current?.value) {
      teamNameRef.current.value = "";
    }
  };

  // AGAIN.... THE ANY...
  const addNewCategorySubmitHandle = (e: any) => {
    e.preventDefault();
    // ADD ADDING LOGIC HERE...
    resetAddNewCategoryValues();
    setAddNewModal(false);
  };

  // AGAIN.... THE ANY...
  const addNewTeamSubmitHandle = (e: any) => {
    e.preventDefault();
    // ADD ADDING LOGIC HERE
    resetAddNewTeamValues();
    setAddNewTeamModal(false);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-neutral p-3 text-neutral-content">
      <input
        type="checkbox"
        id="add-new-modal"
        checked={addNewModal}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={() => {
              setAddNewModal(false);
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Add new Category</h3>
          <form
            action=""
            className="my-4 flex w-full flex-col justify-center gap-2 text-center"
            onSubmit={(e) => addNewCategorySubmitHandle(e)}
          >
            <input
              required
              placeholder="Category Name..."
              className="input-bordered input-primary input"
              ref={categoryNameRef}
            />
            <div className="flex h-12 flex-row items-center">
              <span className="mr-4 ml-2">Color: </span>
              <input
                required
                type="color"
                placeholder="Category Name..."
                className="h-full w-full bg-transparent"
                ref={categoryColorRef}
              />
            </div>
            <button type="submit" className="btn-primary btn">
              Add Category
            </button>
          </form>
        </div>
      </div>

      <input
        type="checkbox"
        id="add-new-team-modal"
        checked={addNewTeamModal}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={() => {
              setAddNewTeamModal(false);
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="text-lg font-bold">Add new Team</h3>
          <form
            action=""
            className="my-4 flex w-full flex-col justify-center gap-2 text-center"
            onSubmit={(e) => addNewTeamSubmitHandle(e)}
          >
            <input
              required
              placeholder="Team Name..."
              className="input-bordered input-primary input"
              ref={teamNameRef}
            />
            <button type="submit" className="btn-primary btn">
              Add Team
            </button>
          </form>
        </div>
      </div>

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
          {categories.map((cat, index) => (
            <span key={index} className="flex w-full flex-row items-center">
              <MoreVertIcon fontSize="small" className="mr-2"></MoreVertIcon>
              <button style={{ color: cat.color }} className="text-lg">
                {cat.name}
              </button>
            </span>
          ))}
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
