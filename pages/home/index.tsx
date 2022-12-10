import Logo from "@components/logo";
import Note from "@components/note";

import Sidebar from "@components/sidebar";

import { NextPage } from "next";

const Home: NextPage = () => {
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
          <Note
            username="Richard"
            userColor="green"
            description="Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem facere perspiciatis culpa
              praesentium sequi quas aut illum, omnis cupiditate
              illo, nobis quidem soluta excepturi minus incidunt
              consectetur. Neque, nesciunt dolorum?"
            rating={3}
            language={"C++"}
            date={new Date("2022-02-11")}
            minutesSpent={69}
            tags={[
              {
                description: "important",
                name: "important",
                tagColor: "important",
              },
            ]}
          />
          <Note
            username="Richard"
            userColor="green"
            description="Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem facere perspiciatis culpa
              praesentium sequi quas aut illum, omnis cupiditate
              illo, nobis quidem soluta excepturi minus incidunt
              consectetur. Neque, nesciunt dolorum?"
            rating={5}
            language={"C++"}
            date={new Date("2022-03-25")}
            minutesSpent={69}
            tags={[
              {
                description: "personal",
                name: "personal",
                tagColor: "personal",
              },
              {
                description: "important",
                name: "important",
                tagColor: "important",
              },
            ]}
          ></Note>
          <Note
            username="Richard"
            userColor="green"
            description="Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem facere perspiciatis culpa
              praesentium sequi quas aut illum, omnis cupiditate
              illo, nobis quidem soluta excepturi minus incidunt
              consectetur. Neque, nesciunt dolorum?"
            rating={5}
            language={"C++"}
            date={new Date("2022-03-25")}
            minutesSpent={69}
            tags={[
              {
                description: "personal",
                name: "personal",
                tagColor: "personal",
              },
              {
                description: "important",
                name: "important",
                tagColor: "important",
              },
            ]}
          ></Note>
          <Note
            username="Richard"
            userColor="green"
            description="Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem facere perspiciatis culpa
              praesentium sequi quas aut illum, omnis cupiditate
              illo, nobis quidem soluta excepturi minus incidunt
              consectetur. Neque, nesciunt dolorum?"
            rating={5}
            language={"C++"}
            date={new Date("2022-03-25")}
            minutesSpent={69}
            tags={[
              {
                description: "personal",
                name: "personal",
                tagColor: "personal",
              },
              {
                description: "important",
                name: "important",
                tagColor: "important",
              },
            ]}
          ></Note>
          <Note
            username="Richard"
            userColor="green"
            description="Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Dolorem facere perspiciatis culpa
              praesentium sequi quas aut illum, omnis cupiditate
              illo, nobis quidem soluta excepturi minus incidunt
              consectetur. Neque, nesciunt dolorum?"
            rating={5}
            language={"C++"}
            date={new Date("2022-03-25")}
            minutesSpent={69}
            tags={[
              {
                description: "personal",
                name: "personal",
                tagColor: "personal",
              },
              {
                description: "important",
                name: "important",
                tagColor: "important",
              },
            ]}
          ></Note>
        </div>
      </main>
    </div>
  );
};

export default Home;
