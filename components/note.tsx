import Stars from "@components/stars";
import TagLabel from "@components/tag";

import { Color, Tag } from "@lib/types";

import { AccountCircle } from "@mui/icons-material";
import { Timestamp } from "firebase/firestore";

import { FC } from "react";

export type NoteProps = {
  username: string | null;
  userColor: Color | null;
  date: Timestamp;
  description: string;
  language: string;
  minutesSpent: number;
  rating: number;
  tags: Array<Tag>;
};

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
  userColor = userColor ?? "gray";

  return (
    <div className="snap-start bg-base-100 pt-3 text-base-content">
      <div className="p-2">
        <div className="flex gap-2">
          <div className="h-14 w-14 flex-none">
            <AccountCircle
              className="h-full w-full"
              style={{ color: userColor, fontSize: "3.5rem" }}
            />
          </div>
          <div className="flex grow flex-col">
            <div className="flex justify-between gap-4 font-bold">
              <span>{username ? username : "loading..."}</span>
              <span>{date.toDate().toDateString()}</span>
            </div>
            <p className="mb-2">
              <span className="font-bold text-success">{language}</span> for{" "}
              <span className="font-bold">{minutesSpent} minutes</span>
            </p>
            <article>{description}</article>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-2">
            {tags.map((tag, i) => {
              return <TagLabel {...tag} key={i} />;
            })}
          </span>
          <span>
            <Stars rating={rating} />
          </span>
        </div>
      </div>
      <footer style={{ background: userColor }} className="h-1" />
    </div>
  );
};

export default Note;
