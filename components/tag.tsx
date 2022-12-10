import { Tag } from "@lib/types";
import { FC } from "react";

const TagLabel: FC<Tag> = ({ name, tagColor, description }) => {
  return (
    <div className="tooltip tooltip-bottom" data-tip={description}>
      <span
        className="badge"
        style={{
          background: tagColor,
        }}
      >
        {name}
      </span>
    </div>
  );
};

export default TagLabel;
