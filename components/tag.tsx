import { Tag } from "@lib/types";
import { FC } from "react";

export type TagLabelProps = {
  tooltip?: "bottom" | "right" | "left" | "top" | false;
} & Tag;

const TagLabel: FC<TagLabelProps> = ({
  name,
  tagColor,
  description,
  tooltip = "bottom",
}) => {
  return (
    <div
      className={tooltip ? `tooltip tooltip-${tooltip} ` : ""}
      // can't do right because of obvious clipping, bottom clips main element border as well... :shrug:
      data-tip={tooltip && description}
    >
      <span
        className="badge"
        style={{
          background: tagColor,
        }}
      >
        <span className="bg-inherit bg-clip-text text-transparent contrast-[900] grayscale invert">
          {name}
        </span>
      </span>
    </div>
  );
};

export default TagLabel;
