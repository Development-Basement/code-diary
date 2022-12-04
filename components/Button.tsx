import React, { FC } from "react";
import { ButtonProps } from "@lib/types";

const Button: FC<ButtonProps> = (props) => {
  return (
    <div
      onClick={() => {
        console.log("button pressed");
      }}
    >
      {props.text}
    </div>
  );
};

export default Button;
