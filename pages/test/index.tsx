import { TestComponent } from "../../components/testComponent";

export default function index() {
  return (
    <div className="self-center">
      index{" "}
      <h1 className="text-3xl font-bold underline text-red-600">
        Hello World!
      </h1>
      <br />
      <TestComponent />
    </div>
  );
}
