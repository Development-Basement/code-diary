export const Stars = () => {

  return (
    <div className="rating">
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled checked />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled />
      <input type="radio" className="mask mask-star-2 bg-secondary" disabled />
    </div>
  );
};