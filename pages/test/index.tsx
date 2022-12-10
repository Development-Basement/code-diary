import { TestComponent } from "@components/testComponent";
import Link from "next/link";

export default function index() {
  return (
    <div className="self-center">
      index{" "}
      <h1 className="text-3xl font-bold text-red-600 underline">
        Hello World!
      </h1>
      <br />
      <TestComponent />
      <br />
      <Link className="link" href={"/"}>
        go back
      </Link>
    </div>
  );
}
