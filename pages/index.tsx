import { NextPage } from "next";
import Link from "next/link";
import Logo from "@components/Logo";

const Home: NextPage = () => {
  return (
        <Link href={"./login"} className="link text">
        </Link>
    <div className="stack w-screen text-left bg-accent text-white">
      <p>
        Home <br />
        <Link href={"./test"} className="link text">
          Test page
        <br />
          Login
        </Link>
      </p>
      <Logo rem={6}></Logo>
    </div>
  );
};

export default Home;
