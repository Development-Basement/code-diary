import { NextPage } from "next";

const Error500: NextPage = () => {
  return (
    <div className="flex h-screen place-items-center justify-center bg-neutral text-xl">
      <span className="bold mr-5 border-r pr-5 text-2xl leading-loose text-primary">
        500
      </span>
      <span className="text-error">Internal server error</span>
    </div>
  );
};

export default Error500;
