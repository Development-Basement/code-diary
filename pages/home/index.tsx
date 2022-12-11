import Logo from "@components/logo";
import Note from "@components/note";

import { Add } from "@mui/icons-material";

import { useState } from "react";

import Sidebar from "@components/sidebar";

import { useAuth } from "@contexts/authContext";

import { Record, Tag, TagId } from "@lib/types";

import { NextPage } from "next";

const Home: NextPage = () => {
  const [currentDirectoey, setCurrentDirectory] =
    useState<string>("Default directory");

  const { userData } = useAuth();

  const [rating, setRating] = useState<unknown>(1);

  const ratingChagedHandle = (rating: unknown) => {
    console.log(rating);
  };

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

  return (
    <div className="flex h-screen w-screen flex-col bg-base-100">
      {/* Modal */}
      <input type="checkbox" id="my-modal" className="modal-toggle" />
      <label htmlFor="my-modal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <h3 className="text-lg font-bold">Add new Note</h3>
          <form
            action=""
            className="my-4 flex w-full flex-col justify-center gap-2 text-center"
          >
            <input
              type="text"
              required
              placeholder="Language"
              className="input-bordered input-primary input"
            />
            <input
              type="text"
              required
              placeholder="Duration"
              className="input-bordered input-primary input input-md"
            />
            <textarea
              required
              placeholder="Description"
              className="textarea-primary textarea"
            />
            <input
              type="text"
              required
              placeholder="Date and Time, leave blank for current time"
              className="input-bordered input-primary input input-md"
            />

            <div className="flex flex-row justify-between">
              <select className="select-ghost select">
                <option disabled selected>
                  Team
                </option>
                <option>Svelte</option>
                <option>gaeuifgaiogerioug er8guh puqghpugh pugh p</option>
                <option>React</option>
              </select>

              <select className="select-ghost select">
                <option disabled selected>
                  Category
                </option>
                <option>Svelte</option>
                <option>Vue</option>
                <option>React</option>
              </select>
            </div>

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

            <label htmlFor="my-modal" className="btn-primary btn">
              Add
            </label>
          </form>
          <p className="">{"Temp text " + (rating as string)}</p>
        </label>
      </label>

      <div className="z-50 flex h-16 w-screen flex-row gap-x-4 bg-neutral text-neutral-content shadow-lg shadow-base-content/5">
        <span className="w-64px px-3">
          <Logo rem={2} />
        </span>
        <span className="mx-auto my-auto flex w-1/2 justify-between">
          <span>{currentDirectoey}</span>
          <label
            className="h-8 w-8 rounded-full bg-primary hover:opacity-75"
            htmlFor="my-modal"
          >
            <Add className="h-8 w-8"></Add>
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
