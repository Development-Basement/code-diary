import Link from "next/link";

export default function index() {
  return (
    <div className="self-center content-center grid h-screen place-items-center">
      <div className="w-3/5 p-20 content-center grid h-screen place-items-center h-4/5 drop-shadow-xl bg-lighter-dark rounded-2xl">
      <h1 className="text-2xl font-semibold">Sign Up</h1>
      <form action="/api/form" method="post" className="w-4/5 mt-5">
        <input type="text" id="first" name="first" required placeholder="email" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
        <input type="text" id="last" name="last" required placeholder="username" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
        <input type="text" id="last" name="last" required placeholder="password" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
        <input type="text" id="last" name="last" required placeholder="password again" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
        <button type="submit" className="btn-secondary btn-wide mt-3 btn-sm w-full">Send Verification Email</button>
      </form>
      </div>
    </div>
  );
}

