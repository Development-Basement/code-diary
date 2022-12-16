import Logo from "@components/logo";
import { auth } from "@lib/firebase";

import Link from "next/link";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { useRef, useState } from "react";

import { FormSubmitHandler } from "@lib/types";

import Spinner from "@components/spinner";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";

export default function Login() {
  const [resetModalOpen, setResetModalOpen] = useState(false);

  const resetEmailRef = useRef<HTMLInputElement>(null);

  const loginEmailRef = useRef<HTMLInputElement>(null);
  const loginPasswordRef = useRef<HTMLInputElement>(null);

  const [sendPasswordResetEmail, passwordLoading, passwordError] =
    useSendPasswordResetEmail(auth);

  const handlePasswordResetSubmit: FormSubmitHandler = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(resetEmailRef.current!.value);
  };

  const [login, , loginLoading, loginError] =
    useSignInWithEmailAndPassword(auth);

  return (
    <>
      <main className="flex h-screen flex-col place-items-center justify-center bg-base-100 pb-32 pt-16">
        <span className="flex flex-col place-items-center gap-1">
          <Logo rem={4} />
          <p className="mb-7 text-sm">Keep track of your coding progress!</p>
        </span>
        <div className="flex w-1/3 flex-col place-items-center gap-2">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (
                loginEmailRef.current?.value &&
                loginPasswordRef.current?.value
              ) {
                login(
                  loginEmailRef.current.value,
                  loginPasswordRef.current.value,
                );
              }
            }}
            className="flex w-1/2 flex-col justify-center gap-2 text-center"
          >
            <input
              type="email"
              required
              placeholder="email"
              className="input-bordered input-primary input input-md"
              ref={loginEmailRef}
              autoFocus
            />
            <input
              type="password"
              required
              placeholder="password"
              className="input-bordered input-primary input input-md"
              ref={loginPasswordRef}
            />
            <button
              type="submit"
              className="btn-primary btn-md btn mt-3 w-full"
              disabled={loginLoading}
            >
              {loginLoading ? (
                <span className="flex place-items-center">
                  <span className="mr-2 h-4 w-4">
                    <Spinner />
                  </span>
                  Loading...
                </span>
              ) : (
                "Login"
              )}
            </button>
            {loginError ? (
              <div className="alert alert-error mt-3">
                <p className="block overflow-hidden text-ellipsis whitespace-normal break-words">
                  {loginError.message}
                </p>
              </div>
            ) : (
              <></>
            )}
          </form>
          <button
            className="link-primary link mt-3 no-underline"
            onClick={(e) => {
              e.preventDefault();
              setResetModalOpen(true);
              setTimeout(() => {
                resetEmailRef.current!.focus();
              }, 50);
            }}
          >
            Forgot password?
          </button>
          <span className="divider py-4">OR</span>
          <Link className="link w-1/2 no-underline" href={"./signup"}>
            <button className="btn-primary btn w-full">Sign Up</button>
          </Link>
        </div>
      </main>
      <div id="password-modal">
        <input
          type="checkbox"
          className="modal-toggle"
          checked={resetModalOpen}
          readOnly
        />
        <div className="modal">
          <div className="modal-box relative flex flex-col">
            <button
              className="btn-sm btn-circle btn absolute right-2 top-2 p-1"
              onClick={(e) => {
                e.preventDefault();
                setResetModalOpen(false);
              }}
            >
              <CloseRoundedIcon className="h-full w-full" />
            </button>
            <h2 className="text-2xl font-bold">Reset password</h2>
            <span className="divider my-1" />
            <form onSubmit={handlePasswordResetSubmit}>
              <input
                type="email"
                placeholder="account email"
                className="input-bordered input-primary input w-full"
                ref={resetEmailRef}
                required
                autoFocus={resetModalOpen}
              />
              {passwordError ? (
                <div className="alert alert-error mt-3">
                  <p className="block overflow-hidden text-ellipsis whitespace-normal break-words">
                    {passwordError.message}
                  </p>
                </div>
              ) : (
                <></>
              )}
              <span className="mt-2 flex w-full justify-end">
                <button
                  className="btn-primary btn"
                  disabled={passwordLoading}
                  type="submit"
                >
                  Send email
                </button>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
