import ThemePicker from "@components/styleTest/themePicker";
import { useAuth, UsernameRegex } from "@contexts/authContext";

import { FormSubmitHandler } from "@lib/types";

import Link from "next/link";

import { FC, useRef } from "react";

export default function Index() {
  const sent = false;

  return (
    <>
      <div className="flex h-screen items-center justify-center bg-neutral">
        <main
          className="px-auto flex h-1/2 min-h-max w-1/2 min-w-max flex-col items-center justify-center rounded-lg
       bg-base-100 pb-32 pt-16 shadow-2xl drop-shadow-2xl"
        >
          <h1 className="mb-10 text-center text-4xl font-semibold">Sign Up</h1>
          {!sent ? <SignUpForm /> : <PostSignUp />}
        </main>
      </div>
      <ThemePicker />
    </>
  );
}

const SignUpForm: FC = () => {
  const { createAccountWithEmail } = useAuth();

  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);

  const submitFormHandle: FormSubmitHandler = (e) => {
    e.preventDefault();
    const username = usernameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    // make TS happy
    if (
      username === undefined ||
      email === undefined ||
      password === undefined
    ) {
      return; // probably should display an error to alert the user
    }
    if (password != passwordAgainRef.current?.value) {
      return; // probably should display an error to alert the user
    }

    // TODO: @AlbertPatik do error handling (handle firebase errors, show stuff on error, ...)
    createAccountWithEmail({ username, password, email });
  };

  return (
    <form
      className="flex w-1/2 max-w-sm flex-col justify-center gap-1 text-center"
      onSubmit={submitFormHandle}
    >
      <input
        type="email"
        required
        placeholder="email"
        className="input-bordered input-primary input input-md"
        ref={emailRef}
      />
      <br />
      <input
        type="text"
        required
        placeholder="username"
        minLength={3}
        maxLength={15}
        pattern={UsernameRegex.source}
        className="input-bordered input-primary input input-md"
        ref={usernameRef}
      />
      <br />
      <input
        type="password"
        required
        minLength={6}
        placeholder="password"
        className="input-bordered input-primary input input-md"
        ref={passwordRef}
      />
      <br />
      <input
        type="password"
        required
        minLength={6}
        placeholder="password again"
        className="input-bordered input-primary input input-md"
        ref={passwordAgainRef}
      />
      <br />
      <button
        type="submit"
        className="btn btn-primary btn-md mt-3 text-base font-bold"
      >
        Sign Up
      </button>
    </form>
  );
};

const PostSignUp: FC = () => {
  return (
    <div className="flex w-1/2 flex-col items-center justify-center">
      <article className="prose">
        <p>
          We&apos;ve sent a verification email to the provided adress. Please
          make sure to also check the spam folder.
        </p>
        <p>Once you&apos;re finished click the button below.</p>
      </article>
      <Link className="w-full text-center no-underline" href={"./login"}>
        <button className="btn-outline btn btn-primary mt-6">
          Back to Login
        </button>
      </Link>
      <button className="link mt-8 font-bold text-primary no-underline">
        I have not received an email...
      </button>
    </div>
  );
};
