import Link from "next/link";

export default function index() {
  return (
    <div className="self-center content-center grid h-screen place-items-center">
      <span className="inline flex">
        <h1 className="text-5xl font-bold text-secondary">Code</h1><h1 className="text-5xl font-bold">Diary</h1>
      </span>
      <p className="text-sm mt-2 mb-7 text-gray">Keep track of your coding</p>
      <form action="/api/form" method="post" className="w-2/5">
        <input type="text" id="first" name="first" required placeholder="email" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
        <input type="text" id="last" name="last" required placeholder="password" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
        <button type="submit" className="btn btn-secondary btn-wide mt-3 btn-sm w-full" >Login</button><br />
      </form>
      <button className="w-2/5 text-secondary mt-3">Forgotten password</button>
      <Link className="no-underline link w-2/5 mt-3" href={"./sign-up"}><button className="btn btn-secondary btn-wide mt-3 btn-sm w-full">Sign Up</button><br /></Link>
      <button className="mt-3 w-2/5 btn btn-outline btn-secondary btn-wide btn-sm">Continue with Google</button>
    </div>
  );
}
