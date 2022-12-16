import { NextPage } from "next";

const Error404: NextPage = () => {
  return (
    <div className="flex h-screen place-items-center justify-center bg-neutral text-xl">
      <span className="bold mr-5 border-r pr-5 text-2xl leading-loose text-primary">
        404
      </span>
      <span className="text-error">This page could not be found</span>
    </div>
  );
};

export default Error404;
