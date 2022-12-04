import { NextPage } from "next";
import { useContext, useState } from "react";
import { ThemeContext } from "../../data-layers/ThemeContext";
import Navbar from "@components/Navbar";

const Home: NextPage = () => {
  const { setTheme } = useContext(ThemeContext);
  const [navbarOpen, setNavbarOpen] = useState(true);

  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <Navbar currentDirectory="Albert's notes"></Navbar>
      </div>
    </>
  );
};

export default Home;
