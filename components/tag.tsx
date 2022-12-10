import { Tag } from "@lib/types";
import { FC } from "react";

const TagLabel: FC<Tag> = ({ name, tagColor, description }) => {
  return (
    <div
      className="tooltip tooltip-bottom"
      // can't do right because of obvious clipping, bottom clips main element border as well... :shrug:
      data-tip={description}
    >
      <span
        className="badge"
        style={{
          background: tagColor,
        }}
      >
        <span
          // style={{ color: tagColor }}
          // TODO: finish to get full black and white
          className="bg-inherit bg-clip-text text-transparent contrast-[900] grayscale invert"
        >
          {name}
        </span>
      </span>
    </div>
  );
};

export default TagLabel;
