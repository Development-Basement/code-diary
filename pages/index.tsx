import { NextPage } from "next";
import Link from "next/link";
import Logo from "@components/Logo";

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
