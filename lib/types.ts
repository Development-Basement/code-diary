import React from "react";

type ButtonHandler = (event: React.MouseEvent<HTMLButtonElement>) => void;

// COMPONENT PROPS
type ButtonProps = {
  text: string;
};

export type { ButtonProps };

export type { ButtonHandler };
