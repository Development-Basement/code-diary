import Logo from "@components/logo";
import Image from "next/image";
import Link from "next/link";
import google from "../public/google.png";

export default function index() {
  return (
    <div className="grid h-screen place-items-center content-center self-center">
      <span className="flex">
        <Logo rem={3} />
      </span>
      <p className="text-light mb-7 text-xs">Keep track of your coding</p>
      <form action="/api/form" method="post" className="w-1/5">
        <input
          type="email"
          id="first"
          required
          placeholder="email"
          className="input-bordered input-primary input input-sm mt-3 w-full rounded"
        />
        <br />
        <input
          type="password"
          id="last"
          required
          placeholder="password"
          className="input-bordered input-primary input input-sm mt-3 w-full rounded"
        />
        <br />
        <button
          type="submit"
          className="btn-primary btn-sm btn mt-3 w-full rounded"
        >
          Login
        </button>
        <br />
      </form>
      <button className="mt-3 w-1/5 rounded text-primary">
        Forgotten password
      </button>
      <Link className="link mt-3 w-1/5 no-underline " href={"./signup"}>
        <button className="btn-primary btn-sm btn mt-3 w-full rounded">
          Sign Up
        </button>
        <br />
      </Link>
      <button className="btn-outline btn-primary btn-sm btn relative mt-3 w-1/5 rounded">
        <Image
          src={google}
          alt="google"
          className="absolute left-0 ml-[5px] h-[25px] w-[25px] object-scale-down"
        />
        <p className="text-center">Continue with Google</p>
      </button>
    </div>
  );
}
