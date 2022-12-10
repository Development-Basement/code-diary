import Logo from "@components/logo";
import Note from "@components/note";

import Sidebar from "@components/sidebar";

import { useAuth } from "@contexts/authContext";

import { Record, Tag, TagId } from "@lib/types";

import { NextPage } from "next";

const Home: NextPage = () => {
  const { userData } = useAuth();

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
      <div className="z-50 flex h-16 w-screen flex-row gap-x-4 bg-neutral text-neutral-content shadow-lg shadow-base-content/5">
        <span className="mx-3">
          <Logo rem={2} />
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
