import Logo from "@components/logo";
import ThemePicker from "@components/styleUtils/themePicker";

import Image from "next/image";

import google from "../public/google.png";

import Link from "next/link";

export default function Login() {
  return (
    <>
      <main className="flex h-screen flex-col place-items-center justify-center bg-base-100 pb-32 pt-16 text-base">
        <span className="flex flex-col place-items-center gap-1">
          <Logo rem={4} />
          <desc className="mb-7 text-sm">
            Keep track of your coding progress!
          </desc>
        </span>
        <div className="flex w-1/3 flex-col place-items-center gap-2">
          <form className="flex w-1/2 flex-col justify-center gap-2 text-center">
            <input
              type="email"
              required
              placeholder="email"
              className="input-bordered input-primary input input-md"
            />
            <input
              type="password"
              required
              placeholder="password"
              className="input-bordered input-primary input input-md"
            />
            <button
              type="submit"
              className="btn btn-primary btn-md mt-3 w-full text-base"
            >
              Login
            </button>
          </form>
          <button className="link mt-3 text-primary no-underline">
            Forgotten password
          </button>
          <span className="divider py-4">OR</span>
          <Link className="link w-1/2 no-underline" href={"./signup"}>
            <button className="btn btn-primary w-full">Sign Up</button>
          </Link>
          <button className="btn-outline btn btn-primary relative mt-3 w-1/2">
            <Image
              src={google}
              alt="google"
              priority
              className="absolute left-0 ml-2 mr-3 h-7 w-7 object-scale-down"
            />
            Continue with Google
          </button>
        </div>
      </main>
      <ThemePicker />
    </>
  );
}
