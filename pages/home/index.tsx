import { NextPage } from "next";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import Logo from "../../components/Logo";
import React from "react";
import { Note } from "@components/note";

const Home: NextPage = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="flex flex-auto h-[5%] bg-neutral drop-shadow-lg"><Logo /></div>
      <div className="flex h-[95%] bg-base-100">
        <div className="w-1/5 bg-neutral h-full">
          <h2 className="text-[190%]">Teams</h2>
          <h2 className="text-[190%]">Categories</h2>
          <button
            onClick={() => {
              setTheme("luxury");
            }}
          >
            luxury
          </button>
          <br />
          <button
            onClick={() => {
              setTheme("halloween");
            }}
          >
            haloween
          </button>
        </div>
        <div className="w-1/2 ml-[15%] bg-neutral h-full">
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
            tags={[{ description: "personal", name: "personal", tagColor: "personal", }, { description: "important", name: "important", tagColor: "important", }]}
          />
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
            tags={[{ description: "important", name: "important", tagColor: "important", }]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

