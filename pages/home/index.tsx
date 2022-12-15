import Logo from "@components/logo";

import Sidebar from "@components/sidebar";

import { useAuth } from "@contexts/authContext";

import { converter, FormSubmitHandler, Record, Tag, TagId } from "@lib/types";

import { Add } from "@mui/icons-material";

import { NextPage } from "next";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CloseIcon from "@mui/icons-material/Close";

import { db } from "@lib/firebase";

import { collection, onSnapshot } from "firebase/firestore";

import SettingsIcon from "@mui/icons-material/Settings";

import LogoutIcon from "@mui/icons-material/Logout";

import Note from "@components/note";
import { possibleThemes, ThemeContext } from "@contexts/themeContext";
import React, { useContext, useEffect, useRef, useState } from "react";

export type TagMap = { [id: TagId]: Tag };

const Home: NextPage = () => {
  const { userData, currentUser } = useAuth();
  const { setTheme, theme } = useContext(ThemeContext);

  const [tags, setTags] = useState<TagMap>({});
  const [records, setRecords] = useState<Array<Record>>([]);
  const [addNewModal, setAddNewModal] = useState<boolean>(false);
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [categories, setCategories] = useState([
    "category 1",
    "category 2",
    "category 3",
  ]);
  const [rating, setRating] = useState(1);
  const [personName, setPersonName] = React.useState<Array<string>>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [avilableCategories, setAvilableCategories] = useState<string[]>([]);

  // ADD NEW STATES EXCEPT CATEGORY
  const languageRef = useRef<HTMLInputElement>(null);
  const durationRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const timeRef = useRef<HTMLInputElement>(null);

  const getUserRecordsRef = (uid: string) => {
    return collection(db, "userRecords", uid, "records").withConverter(
      converter<Record>(),
    );
  };

  const getUserTagsRef = (uid: string) => {
    return collection(db, "userRecords", uid, "tags").withConverter(
      converter<Tag>(),
    );
  };

  function addCatgoriesSelectHandle(catName: string) {
    const categsTmp: Array<string> = [];
    const selectedCategsTmp = selectedCategories;
    avilableCategories.forEach((cat) => {
      if (cat !== catName) categsTmp.push(cat);
      else selectedCategsTmp.push(cat);
    });
    setAvilableCategories(categsTmp);
    setSelectedCategories(selectedCategsTmp);
  }

  function removeCatgoriesSelectHandle(catName: string) {
    const selectedCategsTmp: Array<string> = [];
    const avilableCategsTmp = avilableCategories;
    selectedCategories.forEach((cat) => {
      if (cat !== catName) selectedCategsTmp.push(cat);
      else avilableCategsTmp.push(cat);
    });
    setAvilableCategories(avilableCategsTmp);
    setSelectedCategories(selectedCategsTmp);
  }

  const resetAddNewNoteValues = () => {
    languageRef.current!.value = "";
    durationRef.current!.value = "";
    descriptionRef.current!.value = "";
    dateRef.current!.value = "";
    timeRef.current!.value = "";
    setAvilableCategories(categories);
    setSelectedCategories([]);
  };

  //* FIX THE ANY, I DON'T WANT TO GOOGLE WHAT GOD DAMN TYPE IT IS...
  //! @AlbertPatik it's QUITE LITERALLY IN TYPES.TS BRUH :facepalm:
  // also, if in doubt, you can assign an empty function as the onSubmit handle
  // your IDE will tell you the type of the event, you just have to type it out after that
  const addNewNoteSubmitHandle: FormSubmitHandler = (e) => {
    e.preventDefault();
    resetAddNewNoteValues();
    setAddNewModal(false);
  };

  useEffect(() => {
    if (currentUser == null) {
      console.error("You should NOT be here at all");
      return;
    }

    const tagsUnsub = onSnapshot(
      getUserTagsRef(currentUser.uid),
      (snap) => {
        const newTags: TagMap = {};
        snap.docs.forEach((doc) => {
          newTags[doc.id] = doc.data();
        });
        setTags(newTags);
      },
      (err) => {
        // for development purposes
        // TODO: delete this ;)
        console.log(err.message);
      },
    );
    const recordsUnsub = onSnapshot(
      getUserRecordsRef(currentUser.uid),
      (snap) => {
        const newRecords: Array<Record> = [];
        snap.docs.forEach((doc) => {
          newRecords.push(doc.data());
        });
        // sort the records to get the newest on the start
        newRecords.sort((a, b) => (a.date > b.date ? 1 : -1));
        console.debug(typeof newRecords[0].date, newRecords[0].date);
        setRecords(newRecords);
      },
      (err) => {
        // for development purposes
        // TODO: delete this ;)
        console.log(err.message);
      },
    );

    return () => {
      tagsUnsub();
      recordsUnsub();
    };
  }, [currentUser]); // technically redundant

  useEffect(() => {
    //* cringe intensifies
    setAvilableCategories(categories);
  }, [categories]);

  return (
    <div className="flex h-screen w-screen flex-col bg-base-100">
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
          <h3 className="text-lg font-bold">Add new Note</h3>
          <form
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
                      onClick={(e) => {
                        e.preventDefault();
                        removeCatgoriesSelectHandle(cat);
                      }}
                    >
                      <CloseIcon />
                      {" " + cat}
                    </button>
                  ))
                ) : (
                  <span className="m-auto">Select Categories</span>
                )}
              </div>

              <div className="dropdown-end dropdown-hover dropdown dropdown-top max-w-max">
                <label tabIndex={0} className="btn ml-4">
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
                      onClick={(e) => {
                        e.preventDefault();
                        addCatgoriesSelectHandle(cat);
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </ul>
              </div>
            </span>
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

      <input
        type="checkbox"
        id="add-new-modal"
        checked={settingsOpen}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={() => {
              setSettingsOpen(false);
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="mb-4 text-lg font-bold">Settings</h3>
          <h4 className="text-md mb-4 font-bold">Theme - {theme}</h4>
          <span className="grid-cols grid grid-cols-3 gap-4">
            {possibleThemes.map((theme) => (
              <div
                key={theme}
                onClick={() => {
                  setTheme(theme);
                }}
                data-theme={theme}
                className="flex flex-col items-center justify-center rounded-lg border border-primary p-0 hover:cursor-pointer"
              >
                <span className="h-min w-min p-4">{theme}</span>
                <div className="m-0 flex h-6 w-full flex-row rounded-b-lg">
                  <span
                    className="h-full flex-1 bg-primary"
                    style={{ borderRadius: "0px 0px 0px 0.5rem" }}
                  ></span>
                  <span className="h-full flex-1 bg-secondary"></span>
                  <span className="h-full flex-1 bg-accent"></span>
                  <span className="h-full flex-1 bg-neutral"></span>
                  <span className="h-full flex-1 bg-base-100"></span>
                  <span className="h-full flex-1 bg-info"></span>
                  <span className="h-full flex-1 bg-warning"></span>
                  <span className="h-full flex-1 bg-success"></span>
                  <span
                    className="h-full flex-1 bg-error"
                    style={{ borderRadius: "0px 0px 0.5rem 0px" }}
                  ></span>
                </div>
              </div>
            ))}
          </span>
        </div>
      </div>

      <div className="z-50 flex h-16 w-screen flex-row gap-x-4 bg-neutral text-neutral-content shadow-lg shadow-base-content/5">
        <span className="w-64px px-3">
          <Logo rem={2} />
        </span>
        <span className="mx-auto my-auto flex w-1/2 justify-between">
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
                  <button
                    className="btn-ghost btn justify-start"
                    onClick={() => {
                      setSettingsOpen(true);
                    }}
                  >
                    <SettingsIcon></SettingsIcon>
                    Settings
                  </button>
                </li>
                <li>
                  <button className="btn-ghost btn justify-start text-error">
                    <LogoutIcon />
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
          {records.map((record) => (
            <Note
              {...record}
              username={userData.username}
              userColor={userData.profileColor}
              tags={record.tags
                .map((tagId) => tags[tagId])
                .filter((t) => t !== undefined)}
              key={JSON.stringify(record)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
