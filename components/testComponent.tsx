import { ButtonHandler } from "@lib/types";
import { useState } from "react";

export const TestComponent = () => {
  const [count, setCount] = useState(0);
  const onIncrementClickHandle: ButtonHandler = (e) => {
    e.preventDefault();
    setCount(count + 1);
  };
  return (
    <div className="alert alert-info w-80">
      TestComponent <br />
      Count: {count} <br />
      <button className="btn-secondary btn" onClick={onIncrementClickHandle}>
        increment
      </button>
    </div>
  );
};
