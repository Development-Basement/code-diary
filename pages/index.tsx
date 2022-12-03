import { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className="stack w-screen text-left bg-accent text-white">
      <p>
        Home <br />
        <Link href={"./test"} className="link text">
          Test page
        </Link>
        <br />
        <Link href={"./login"} className="link text">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Home;
