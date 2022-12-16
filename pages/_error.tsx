import { NextPage, NextPageContext } from "next";

type ErrorPageProps = {
  statusCode: number;
};

const Error: NextPage<ErrorPageProps> = ({ statusCode }) => {
  let errorMessage = "";
  switch (statusCode) {
    case 404:
      errorMessage = "This page could not be found.";
      break;
    case 500:
      errorMessage = "Internal server error";
      break;
    default:
      errorMessage = "An error occured";
      break;
  }
  return (
    <div className="fflex h-screen place-items-center justify-center bg-neutral text-xl">
      <span className="bold mr-5 border-r pr-5 text-2xl leading-loose text-primary">
        {statusCode}
      </span>
      <span className="text-error">{errorMessage}</span>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  if (res) {
    return { statusCode: res.statusCode };
  }
  if (err) {
    return { statusCode: err.statusCode ?? 500 };
  }
  return { statusCode: 404 };
};

export default Error;
