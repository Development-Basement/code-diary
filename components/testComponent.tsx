import React, { useState } from "react";
import { ButtonHandler } from "@lib/types";

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
      <button className="btn btn-secondary" onClick={onIncrementClickHandle}>
        increment
      </button>
    </div>
  );
};
