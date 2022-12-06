import { NextPage } from "next";
import { ThemeContext } from "../../contexts/themeContext";
import Navbar from "@components/Navbar";
import { useContext, useState } from "react";

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
