import { NextPage } from "next";
import Link from "next/link";
import Button from "@components/Button";

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
      {
        // testing components
      }
      <Button text="my super button"></Button>
      {
        // testing components
      }
    </div>
  );
};

export default Home;
