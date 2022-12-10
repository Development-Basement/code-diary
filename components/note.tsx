import { Stars } from "@components/stars";
import { Label } from "@components/tag";

import { NoteProps } from "@lib/types";

import { AccountCircle } from "@mui/icons-material";

import { FC } from "react";

const Note: FC<NoteProps> = ({
  username,
  userColor,
  description,
  rating,
  language,
  date,
  minutesSpent,
  tags,
}) => {
  return (
    <div className="snap-start bg-base-100 pt-3 text-base-content">
      <div className="flex gap-2 px-2">
        <div className="h-fit w-32">
          <AccountCircle
            className="h-full w-full"
            style={{ color: userColor || "gray" }}
          />
        </div>
        <div className="stretch">
          <div className="flex justify-between font-bold">
            <span>{username}</span>
            <span>{date.toDateString()}</span>
          </div>
          <p className="mb-2">
            <span className="font-bold text-success">{language}</span> for{" "}
            <span className="font-bold">{minutesSpent} minutes</span>
          </p>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex justify-between px-2">
        <span className="flex items-center gap-2">
          {tags.map((tag, i) => {
            return (
              <Label
                description={tag.description}
                name={tag.name}
                tagColor={tag.tagColor}
                key={i}
              />
            );
          })}
        </span>
        <span>
          <Stars rating={rating} />
        </span>
      </div>
      <footer
        style={{ background: userColor || "gray" }}
        className="mt-1 h-1"
      />
    </div>
  );
};

export default Note;
