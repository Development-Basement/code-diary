import { NextPage } from "next";
import Link from "next/link";
import Logo from "@components/Logo";

const Home: NextPage = () => {
  return (
    <div>
      <div className="stack w-screen text-left bg-primary text-white">
        <p>
          Home <br />
          <Link href={"./test"} className="link text">
            Test page
          </Link>
        </p>
      </div>
      <Logo rem={6}></Logo>
    </div>
  );
};

export default Home;
