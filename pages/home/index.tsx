import Logo from "@components/logo";

import Sidebar from "@components/sidebar";

import { useAuth } from "@contexts/authContext";

import { Add } from "@mui/icons-material";

import { NextPage } from "next";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CloseIcon from "@mui/icons-material/Close";

import SettingsIcon from "@mui/icons-material/Settings";

import LogoutIcon from "@mui/icons-material/Logout";

import React, { useEffect, useRef, useState } from "react";

type categoriesArrayType = {
  name: string;
  selected: boolean;
}[];

const Home: NextPage = () => {
  const [currentDirectoey, setCurrentDirectory] =
    useState<string>("Default directory");

  const { userData } = useAuth();

  const [teams, setTeams] = useState(["team 1", "team 2", "team 3"]);
  const [categories, setCategories] = useState<string[]>([
    "category 1",
    "category 2",
    "category 3",
  ]);

  // ADD NEW STATES EXCEPT CATEGORY
  const languageRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);
  const teamRef = useRef<HTMLSelectElement>(null);
  const [rating, setRating] = useState<unknown>(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [avilableCategories, setAvilableCategories] = useState<string[]>([]);
  useEffect(() => {
    setAvilableCategories(categories);
  }, [categories]);
  const addCatgoriesSelectHandle = (catName: string) => {
    let categsTmp: string[] = [];
    let selectedCategsTmp = selectedCategories;
    avilableCategories.forEach((cat) => {
      if (cat !== catName) categsTmp.push(cat);
      else selectedCategsTmp.push(cat);
    });
    setAvilableCategories(categsTmp);
    setSelectedCategories(selectedCategsTmp);
  };
  const removeCatgoriesSelectHandle = (catName: string) => {
    let selectedCategsTmp: string[] = [];
    let avilableCategsTmp = avilableCategories;
    selectedCategories.forEach((cat) => {
      if (cat !== catName) selectedCategsTmp.push(cat);
      else avilableCategsTmp.push(cat);
    });
    setAvilableCategories(avilableCategsTmp);
    setSelectedCategories(selectedCategsTmp);
  };

  const [addNewModal, setAddNewModal] = useState<boolean>(false);

  const resetAddNewNoteValues = () => {
    if (languageRef.current?.value) {
      languageRef.current.value = "";
    }
    if (durationRef.current?.value) {
      durationRef.current.value = "";
    }
    if (descriptionRef.current?.value) {
      descriptionRef.current.value = "";
    }
    if (dateRef.current?.value) {
      dateRef.current.value = "";
    }
    if (timeRef.current?.value) {
      timeRef.current.value = "";
    }
    setAvilableCategories(categories);
    setSelectedCategories([]);
  };
  // currently when closing modal via close button, the values are preserved...

  // FIX THE ANY, I DON'T WANT TO GOOGLE WHAT GOD DAMN TYPE IT IS...
  const addNewNoteSubmitHandle = (e: any) => {
    e.preventDefault();
    resetAddNewNoteValues();
    setAddNewModal(false);
  };

  const [personName, setPersonName] = React.useState<string[]>([]);

  // DUMMY DATA
  /*
  const tags: { [k: TagId]: Tag } = {
    icIelKOni9WSwgsm8fRQ: {
      description: "personal",
      name: "personal",
      tagColor: "#EEEEEE",
    },
    lkjlkje8123kj128123F: {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
        "Dolorem facere perspiciatis culpa praesentium sequi quas aut illum, " +
        "omnis cupiditate illo, nobis quidem soluta excepturi minus incidunt consectetur. " +
        "Neque, nesciunt dolorum?",
      name: "important",
      tagColor: "#FF3333",
    },
    abcdefg: {
      description: "a very not irrelevant tag",
      name: "nirrelevant",
      tagColor: "#333333",
    },
  };

  const records: Array<Record> = [
    {
      minutesSpent: 12,
      date: new Date("2022-09-12"),
      description: "idk testing stuff or whatever",
      language: "Rust",
      rating: 3,
      tags: ["icIelKOni9WSwgsm8fRQ"],
    },
    {
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. " +
        "Dolorem facere perspiciatis culpa praesentium sequi quas aut illum, " +
        "omnis cupiditate illo, nobis quidem soluta excepturi minus incidunt consectetur. " +
        "Neque, nesciunt dolorum?",
      rating: 1,
      language: "Python",
      date: new Date("2022-03-25"),
      minutesSpent: 5,
      tags: [
        "icIelKOni9WSwgsm8fRQ",
        "lkjlkje8123kj128123F",
        "lkjlkjlksdf",
        "abcdefg",
      ],
    },
  ];
*/

  return (
    <div className="flex h-screen w-screen flex-col bg-base-100">
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
          <h3 className="text-lg font-bold">Add new Note</h3>
          <form
            action=""
            className="my-4 flex w-full flex-col justify-center gap-2 text-center"
            onSubmit={addNewNoteSubmitHandle}
          >
            <input
              required
              placeholder="Language"
              className="input-bordered input-primary input"
              ref={languageRef}
            />
            <input
              required
              placeholder="Duration"
              type="number"
              className="input-bordered input-primary input input-md"
              ref={durationRef}
            />
            <textarea
              placeholder="Description"
              className="textarea-primary textarea"
              ref={descriptionRef}
            />
            <input
              type="date"
              className="input-bordered input-primary input input-md"
              ref={dateRef}
            />
            <input
              type="time"
              className="input-bordered input-primary input input-md"
              ref={timeRef}
            />

            <span className="flex flex-row justify-between">
              <div className=" flex w-full flex-row items-center overflow-auto overflow-y-hidden rounded-lg border border-primary pl-2">
                {selectedCategories.length != 0 ? (
                  selectedCategories.map((cat, index) => (
                    <button
                      className="btn-ghost btn"
                      key={index}
                      onClick={() => {
                        removeCatgoriesSelectHandle(cat);
                      }}
                    >
                      <CloseIcon></CloseIcon>
                      {" " + cat}
                    </button>
                  ))
                ) : (
                  <span className="m-auto">Select Categories</span>
                )}
              </div>

              <div className="dropdown-middle dropdown-hover dropdown-end dropdown max-w-max">
                <label tabIndex={0} className="btn btn ml-4">
                  <ArrowDropDownIcon></ArrowDropDownIcon>
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-52 border border-black bg-base-100 p-2 shadow"
                >
                  {avilableCategories.map((cat, index) => (
                    <button
                      className="btn-ghost btn hover:cursor-pointer"
                      key={index}
                      onClick={() => {
                        addCatgoriesSelectHandle(cat);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </ul>
              </div>
            </span>

            <select className="select-primary select" ref={teamRef}>
              {teams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>

            <div className="rating mx-auto mb-4">
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
                value={1}
                onChange={(rating) =>
                  setRating(rating.target.value as unknown as number)
                }
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
                value={2}
                onChange={(rating) =>
                  setRating(rating.target.value as unknown as number)
                }
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
                value={3}
                onChange={(rating) =>
                  setRating(rating.target.value as unknown as number)
                }
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
                value={4}
                onChange={(rating) =>
                  setRating(rating.target.value as unknown as number)
                }
              />
              <input
                type="radio"
                name="rating-4"
                className="mask mask-star-2 bg-green-500"
                value={5}
                onChange={(rating) =>
                  setRating(rating.target.value as unknown as number)
                }
              />
            </div>

            <button type="submit" className="btn-primary btn w-full">
              Add
            </button>
          </form>
        </div>
      </div>

      <div className="z-50 flex h-16 w-screen flex-row gap-x-4 bg-neutral text-neutral-content shadow-lg shadow-base-content/5">
        <span className="w-64px px-3">
          <Logo rem={2} />
        </span>
        <span className="mx-auto my-auto flex w-1/2 justify-between">
          <span>{currentDirectoey}</span>
          <span className="flex flex-row">
            <label
              className="my-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:opacity-75"
              onClick={() => {
                setAddNewModal(true);
              }}
            >
              <Add className="h-8 w-8"></Add>
            </label>
            <div className="dropdown-end dropdown">
              <button
                tabIndex={0}
                style={{
                  backgroundColor: userData.profileColor ?? "grey",
                }}
                className="my-auto ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary hover:opacity-75"
              ></button>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box w-52 gap-2 bg-base-100 p-2 shadow"
              >
                <li className="mt-3 flex flex-row items-center justify-start border-b border-neutral pb-5 hover:cursor-default">
                  <span
                    tabIndex={0}
                    style={{
                      backgroundColor: userData.profileColor ?? "grey",
                      borderRadius: "50%",
                    }}
                    className="ml-3 mr-2 flex h-8 w-8 items-center justify-center hover:cursor-default"
                  ></span>
                  <>{userData.username ?? "No username?"}</>
                </li>
                <li>
                  <button className="btn-ghost btn justify-start">
                    <SettingsIcon></SettingsIcon>
                    Settings
                  </button>
                </li>
                <li>
                  <button className="btn-ghost btn justify-start text-error">
                    <LogoutIcon></LogoutIcon>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </span>
        </span>
      </div>
      <main className="flex grow flex-row overflow-y-hidden">
        <Sidebar />
        <div className="z-10 mx-auto w-1/2 snap-y scroll-pt-3 space-y-4 overflow-y-auto scroll-smooth bg-neutral py-3 px-1 shadow-xl shadow-base-content/10">
          {/*records.map((record) => (
            <Note
              {...record}
              username={userData.username}
              userColor={userData.profileColor}
              tags={record.tags
                .map((tagId) => tags[tagId])
                .filter((t) => t !== undefined)}
              key={JSON.stringify(record)}
            />
              ))*/}
        </div>
      </main>
    </div>
  );
};

export default Home;
