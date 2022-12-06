import Link from "next/link";
import Logo from "../components/Logo";
import Image from "next/image";
import google from "../public/google.png";

export default function index() {
  return (
    <div className="self-center content-center grid h-screen place-items-center">
      <span className="flex">
        <Logo rem={3} />
      </span>
      <p className="text-xs mb-7 text-light">Keep track of your coding</p>
      <form action="/api/form" method="post" className="w-1/5">
        <input
          type="email"
          id="first"
          required
          placeholder="email"
          className="w-full mt-3 input input-bordered input-primary input-sm rounded"
        />
        <br />
        <input
          type="password"
          id="last"
          required
          placeholder="password"
          className="w-full mt-3 input input-bordered input-primary input-sm rounded"
        />
        <br />
        <button
          type="submit"
          className="btn btn-primary mt-3 btn-sm w-full rounded"
        >
          Login
        </button>
        <br />
      </form>
      <button className="w-1/5 text-primary mt-3 rounded">Forgotten password</button>
      <Link className="no-underline link w-1/5 mt-3 " href={"./signup"}>
        <button className="btn btn-primary mt-3 btn-sm w-full rounded">
          Sign Up
        </button>
        <br />
      </Link>
      <button className="mt-3 btn btn-outline btn-primary w-1/5 btn-sm rounded relative">
        <Image src={google} alt="google" className="object-scale-down h-[25px] w-[25px] left-0 absolute ml-[5px]" />
        <p className="text-center">Continue with Google</p>
      </button>
    </div>
  );
}