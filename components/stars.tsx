import { FC } from "react";

export type StarProps = {
  rating: number;
  setRating?: (val: number) => void;
};

const Stars: FC<StarProps> = ({ rating, setRating }) => {
  // clamp rating between 1 and 5 (inclusive) in whole numbers
  rating = Math.round(rating);
  rating = Math.max(1, rating);
  rating = Math.min(5, rating);

  const isDisabled = setRating === undefined;
  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((i) => (
        <input
          type="radio"
          className="mask mask-star-2 cursor-default bg-success"
          readOnly={isDisabled}
          disabled={isDisabled}
          checked={rating === i}
          onChange={() => {
            if (!isDisabled) {
              setRating(i);
            }
          }}
          key={i}
        />
      ))}
    </div>
  );
};

export default Stars;
