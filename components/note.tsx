import { AccountCircle } from "@mui/icons-material";

const Note = () => {
  //data for component creation
  const name = "Richard Materna";
  const language = "C++";
  const duration = 45;
  const date = "6. 12. 2022";
  const text =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem facere perspiciatis culpa praesentium sequi quas aut illum, omnis cupiditate illo, nobis quidem soluta excepturi minus incidunt consectetur. Neque, nesciunt dolorum?";
  const tag = "important";

  return (
    <div className="flex items-start">
      <div className="w-[25%]">
        <AccountCircle className="h-[90%] w-[90%]" />
      </div>
      <div className="flex-col">
        <div className="flex-row">
          <p>{name}</p>
          <p>{date}</p>
        </div>
        <p className="flex">
          <p className="text-secondary">{language}</p> &nbsp; for {duration}{" "}
          minutes
        </p>
        <p>{text}</p>
        <p>{tag}</p>

        <div className="rating">
          <input
            type="radio"
            name="rating-4"
            className="mask mask-star-2 bg-success"
          />
          <input
            type="radio"
            name="rating-4"
            className="mask mask-star-2 bg-success"
          />
          <input
            type="radio"
            name="rating-4"
            className="mask mask-star-2 bg-success"
          />
          <input
            type="radio"
            name="rating-4"
            className="mask mask-star-2 bg-success "
            checked
          />
          <input
            type="radio"
            name="rating-4"
            className="mask mask-star-2 bg-success"
          />
        </div>
      </div>
    </div>
  );
};

export default Note;
