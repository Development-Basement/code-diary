import React, { FC } from "react";
import { Code } from "@mui/icons-material";

type LogoProps = {
  rem?: number;
};

const Logo: FC<LogoProps> = ({ rem = 1 }) => {
  return (
    <div className="flex flex-initial	flex-row">
      <p style={{ fontSize: rem.toString() + "rem" }} className="text-primary">
        Code
      </p>
      <p style={{ fontSize: rem.toString() + "rem" }}>Diary</p>
      <Code
        className="text-primary"
        sx={{ fontSize: (1.65 * rem).toString() + "rem" }}
      />
    </div>
  );
};

export default Logo;
