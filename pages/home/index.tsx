import Logo from "@components/logo";
import Note from "@components/note";

import Sidebar from "@components/sidebar";

import { useAuth } from "@contexts/authContext";

import { converter, FormSubmitHandler, Record, Tag, TagId } from "@lib/types";

import { Add } from "@mui/icons-material";

import { NextPage } from "next";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CloseIcon from "@mui/icons-material/Close";

import { db } from "@lib/firebase";

import { collection, onSnapshot } from "firebase/firestore";

import React, { useEffect, useRef, useState } from "react";

export type TagMap = { [id: TagId]: Tag };

const Home: NextPage = () => {
  const { userData, currentUser } = useAuth();

  const [tags, setTags] = useState<TagMap>({});
  const [records, setRecords] = useState<Array<Record>>([]);
  const [addNewModal, setAddNewModal] = useState<boolean>(false);

  const [currentDirectory, setCurrentDirectory] = useState("Default directory");
  const [groups, setGroups] = useState(["team 1", "team 2", "team 3"]);
  // going to get nuked soon^TM
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
  const teamRef = useRef<HTMLSelectElement>(null);

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

  const addCatgoriesSelectHandle = (catName: string) => {
    const categsTmp: Array<string> = [];
    const selectedCategsTmp = selectedCategories;
    avilableCategories.forEach((cat) => {
      if (cat !== catName) categsTmp.push(cat);
      else selectedCategsTmp.push(cat);
    });
    setAvilableCategories(categsTmp);
    setSelectedCategories(selectedCategsTmp);
  };

  const removeCatgoriesSelectHandle = (catName: string) => {
    const selectedCategsTmp: Array<string> = [];
    const avilableCategsTmp = avilableCategories;
    selectedCategories.forEach((cat) => {
      if (cat !== catName) selectedCategsTmp.push(cat);
      else avilableCategsTmp.push(cat);
    });
    setAvilableCategories(avilableCategsTmp);
    setSelectedCategories(selectedCategsTmp);
  };

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
                      onClick={() => {
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

              <div className="dropdown-middle dropdown-hover dropdown-end dropdown max-w-max">
                <label tabIndex={0} className="btn ml-4">
                  <ArrowDropDownIcon />
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
              {groups.map((team, index) => (
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
          <span>{currentDirectory}</span>
          <label
            className="my-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:opacity-75"
            onClick={() => {
              setAddNewModal(true);
            }}
          >
            <Add className="h-8 w-8" />
          </label>
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
