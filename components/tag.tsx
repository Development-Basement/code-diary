import { FC } from "react";
import { Tag } from "@lib/types";

export const Label: FC<Tag> = ({ name, tagColor }) => {
  const choices = {
    important: "primary",
    personal: "rose-600"
  };
  const color = choices[tagColor as keyof typeof choices];

  return (
    <span className={`text-${color}`}>
      {name}
    </span>
  );
};