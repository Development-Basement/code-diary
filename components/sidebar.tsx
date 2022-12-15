import { useAuth } from "@contexts/authContext";
import { ThemeContext } from "@contexts/themeContext";

import { useRef, useState } from "react";

import { FC, useContext } from "react";

import { Add } from "@mui/icons-material";

import { FormSubmitHandler } from "@lib/types";

import MoreVertIcon from "@mui/icons-material/MoreVert";

type categoryObjType = {
  name: string;
  color: string;
};

const Sidebar: FC = () => {
  const { userData } = useAuth();
  const { setTheme } = useContext(ThemeContext);

  const [addNewModal, setAddNewModal] = useState<boolean>(false);

  const [categories, setCategories] = useState<categoryObjType[]>([
    { name: "test", color: "red" },
    { name: "test 2", color: "blue" },
  ]);

  const categoryNameRef = useRef<HTMLInputElement>(null);
  const categoryColorRef = useRef<HTMLInputElement>(null);

  const addNewCategoryHandle = () => {
    setAddNewModal(true);
  };

  const resetAddNewCategoryValues = () => {
    if (categoryColorRef.current?.value && categoryNameRef.current?.value) {
      categoryNameRef.current.value = "";
      categoryColorRef.current.value = "";
    }
  };

  // AGAIN.... THE ANY...
  // again.... the facepalm
  const addNewCategorySubmitHandle: FormSubmitHandler = (e) => {
    e.preventDefault();
    // ADD ADDING LOGIC HERE...
    resetAddNewCategoryValues();
    setAddNewModal(false);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-neutral p-3 text-neutral-content">
      <input
        type="checkbox"
        id="add-new-modal"
        checked={addNewModal}
        readOnly
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

      <nav className="flex flex-col">
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
    </div>
  );
};

export default Sidebar;
