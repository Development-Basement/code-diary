import Link from "next/link";

export default function index() {
  let sent:Boolean = true;
  return (
    <div className="self-center content-center grid h-screen w-screen place-items-center">
      <div className="w-3/5 p-10 content-center grid h-5/5 place-items-center drop-shadow-xl bg-lighter-dark rounded-2xl">
        <h1 className="text-2xl font-semibold mb-5">Sign Up</h1>
        {!sent?<form action="/api/form" method="post" className="w-4/5">
          <input type="text" id="first" name="first" required placeholder="email" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
          <input type="text" id="last" name="last" required placeholder="username" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
          <input type="text" id="last" name="last" required placeholder="password" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
          <input type="text" id="last" name="last" required placeholder="password again" className="mt-3 input input-bordered input-secondary input-sm w-full"/><br />
          <button type="submit" className="btn-secondary btn-wide mt-3 btn-sm w-full text-lighter-dark font-bold bg-violet-400" >Send Verification Email</button>
        </form>:
        <>
          <p className="text-justify w-4/5">We've sent a verification email to the provided adress. Please make sure to also check the spam folder.</p>
          <p className="text-justify mt-4 w-4/5">Once you're finished click the button below.</p>
          <button className="mt-10 btn-secondary btn-wide mt-3 btn-sm w-full text-lighter-dark w-4/5 font-bold bg-violet-400" >Back to Login</button>
          <p className="text-center font-bold text-secondary mt-5 w-4/5">I have not recived an email...</p>
        </>}
      </div>
    </div>
  );
}

