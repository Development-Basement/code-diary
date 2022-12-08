import Logo from "@components/logo";
import Note from "@components/note";
import { ThemeContext } from "@contexts/themeContext";
import { NextPage } from "next";
import { useContext } from "react";

const Home: NextPage = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="flex h-16 flex-row gap-x-4 bg-neutral drop-shadow-lg">
        <span className="mx-3">
          <Logo rem={2} />
        </span>
      </div>
      <div className="flex overflow-y-hidden bg-base-100">
        <nav className="h-screen w-96 bg-neutral">
          <h2 className="text-3xl">Teams</h2>
          <h2 className="text-3xl">Categories</h2>
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
        </nav>
        <div className="mx-auto w-1/2 overflow-y-auto bg-neutral">
          <Note />
          <Note />
          <Note />
          <Note />
          <Note />
        </div>
      </div>
    </div>
  );
};

export default Home;
