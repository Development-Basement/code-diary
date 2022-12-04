import { NextPage } from "next";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

const Home: NextPage = () => {
  const { setTheme } = useContext(ThemeContext);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div className="flex flex-auto bg-primary">sdfds</div>
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
  );
};

export default Home;
