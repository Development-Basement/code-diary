import { FC } from "react";
import { StarComponent } from "@lib/types";

export const Stars: FC<StarComponent> = ({ rating }) => {

  const grades = {
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  };

  rating === 1 ? grades.one = true :
    rating === 2 ? grades.two = true :
      rating === 3 ? grades.three = true :
        rating === 4 ? grades.four = true :
          grades.five = true;

  return (
    <div className="rating">
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled checked={grades.one} />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled checked={grades.two} />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled checked={grades.three} />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled checked={grades.four} />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled checked={grades.five} />
    </div>
  );
};