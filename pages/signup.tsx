import Link from "next/link";

export default function index() {
  const sent = true;

  const PostSignUp = () => {
    return (
      <>
        <p className="w-7/12 text-justify text-sm">
          We&apos;ve sent a verification email to the provided adress. Please
          make sure to also check spam folder.
        </p>
        <p className="mt-4 w-7/12 text-justify text-sm">
          Once you&apos;re finished click the button below.
        </p>
        <Link className="w-full text-center no-underline" href={"./login"}>
          <button className="btn-outline btn-primary btn-sm btn mt-6 w-7/12 rounded">
            Back to Login
          </button>
        </Link>
        <button className="mt-8 w-7/12 font-bold text-primary">
          I have not received an email...
        </button>
      </>
    );
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="h-5/12 grid min-h-[200px] w-2/5 place-items-center content-center rounded-[15px] p-10 shadow shadow-slate-600">
        <h1 className="mb-5 text-3xl font-semibold">Sign Up</h1>
        {!sent ? (
          <form action="/api/form" method="post" className="w-full text-center">
            <input
              type="email"
              id="1"
              required
              placeholder="email"
              className="input-bordered input-primary input input-sm mt-3 w-7/12 rounded"
            />
            <br />
            <input
              type="text"
              id="2"
              required
              placeholder="username"
              className="input-bordered input-primary input input-sm mt-3 w-7/12 rounded"
            />
            <br />
            <input
              type="password"
              id="3"
              required
              placeholder="password"
              className="input-bordered input-primary input input-sm mt-3 w-7/12 rounded"
            />
            <br />
            <input
              type="password"
              id="4"
              required
              placeholder="password again"
              className="input-bordered input-primary input input-sm mt-3 w-7/12 rounded"
            />
            <br />
            <button
              type="submit"
              className="btn-primary btn-sm mt-3 w-7/12 rounded font-bold text-lighter-dark"
            >
              Send Verification Email
            </button>
          </form>
        ) : (
          <PostSignUp />
        )}
      </div>
    </div>
  );
}
