import { NextPage } from "next";
import Link from "next/link";

const Index: NextPage = () => {
  return (
    <div>
      <Link href={"/login"}>Login</Link>
      <br></br>
      <Link href={"/home"}>Home</Link>
    </div>
  );
};

export default Index;
