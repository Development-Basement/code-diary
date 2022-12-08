import Link from "next/link";

export default function index() {
  const sent = true;

  const PostSignUp = () => {
    return (
      <>
        <p className="text-justify text-sm w-7/12">
          We've sent a verification email to the provided adress. Please
          make sure to also check spam folder.
        </p>
        <p className="text-justify text-sm mt-4 w-7/12">
          Once you're finished click the button below.
        </p>
        <Link className="no-underline w-full text-center" href={"./login"}>
          <button className="mt-6 btn btn-outline btn-primary w-7/12 btn-sm rounded">
            Back to Login
          </button>
        </Link>
        <button className="w-7/12 text-primary mt-8 font-bold">
          I have not received an email...
        </button>
      </>
    );
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 content-center h-5/12 min-h-[200px] w-2/5 grid place-items-center shadow shadow-slate-600 rounded-[15px]">
        <h1 className="text-3xl font-semibold mb-5">Sign Up</h1>
        {!sent ? (
          <form action="/api/form" method="post" className="w-full text-center">
            <input
              type="email"
              id="1"
              required
              placeholder="email"
              className="mt-3 input input-bordered input-primary input-sm w-7/12 rounded"
            />
            <br />
            <input
              type="text"
              id="2"
              required
              placeholder="username"
              className="mt-3 input input-bordered input-primary input-sm w-7/12 rounded"
            />
            <br />
            <input
              type="password"
              id="3"
              required
              placeholder="password"
              className="mt-3 input input-bordered input-primary input-sm w-7/12 rounded"
            />
            <br />
            <input
              type="password"
              id="4"
              required
              placeholder="password again"
              className="mt-3 input input-bordered input-primary input-sm w-7/12 rounded"
            />
            <br />
            <button
              type="submit"
              className="btn-primary mt-3 btn-sm text-lighter-dark font-bold w-7/12 rounded"
            >
              Send Verification Email
            </button>
          </form>
        ) : <PostSignUp />}
      </div>
    </div>
  );
}
