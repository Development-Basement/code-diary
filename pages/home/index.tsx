import Logo from "@components/logo";
import Note from "@components/note";
import Sidebar from "@components/sidebar";

import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-base-100">
      <div className="z-50 flex h-16 w-screen flex-row gap-x-4 bg-neutral text-neutral-content shadow-lg shadow-base-content/5">
        <span className="mx-3">
          <Logo rem={2} />
        </span>
      </div>
      <main className="flex grow flex-row">
        <Sidebar />
        <div className="z-10 mx-auto w-1/2 snap-y scroll-pt-3 space-y-4 overflow-y-scroll scroll-smooth bg-neutral py-3 px-1 shadow-xl shadow-base-content/10">
          <Note />
          <Note />
        </div>
      </main>
    </div>
  );
};

export default Home;
