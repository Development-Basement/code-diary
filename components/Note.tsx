import React, { FC } from "react";
import { AccountCircle } from "@mui/icons-material";
import { Stars } from "@components/stars";
import { NoteProps } from "@lib/types";
import { Label } from "@components/tag";

export const Note: FC<NoteProps> = ({ username, userColor, description, rating, language, date, minutesSpent, tags, }) => {

  return (
    <div className="mb-5 snap-start">
      <div className="flex">
        <div className="w-[10%] h-fit min-h-[10vh]">
          <AccountCircle className="w-[90%] h-[90%] text- background-base-100" />
        </div>
        <div className="w-[90%]">
          <div className="flex justify-between w-[95%]">
            <span>{username}</span><span>{date.toDateString()}</span>
          </div>
          <p className="mb-2">{language} for {minutesSpent} minutes</p>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <span>
          {tags.map((tag, i) => {
            return (
              <Label description={tags[i].description} name={tags[i].name} tagColor={tags[i].tagColor} key={i} />
            );
          })}
        </span><span><Stars rating={rating} /></span>
      </div>
      <footer className="bg-primary h-2 mt-1"></footer>
    </div>
  );
};