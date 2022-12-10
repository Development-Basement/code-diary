import { StarComponent } from "@lib/types";

import { FC } from "react";

export const Stars: FC<StarComponent> = ({ rating }) => {
  const numElems = 5;
  const elems = [];
  for (let i = 1; i < numElems + 1; ++i) {
    elems.push(i);
  }

  return (
    <div className="rating">
      {elems.map((i) => (
        <input
          type="radio"
          className="mask mask-star-2 bg-secondary"
          disabled
          checked={rating === i}
          key={i}
        />
      ))}
    </div>
  );
};
