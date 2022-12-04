import React, { FC } from "react";

type TestComponentProps = {
  placeholder: string;
  cosi: number;
  other: boolean;
  thingie: Array<number>;
};

export const TestComponent: FC<TestComponentProps> = ({
  placeholder,
  cosi,
  ...props
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  return <input placeholder={placeholder} ref={inputRef}></input>;
};
