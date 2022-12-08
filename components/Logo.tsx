import { Code } from "@mui/icons-material";
import { FC } from "react";

type LogoProps = {
  rem?: number;
};

const Logo: FC<LogoProps> = ({ rem = 1 }) => {
  const logoStyleObj = { fontWeight: "bold", fontSize: rem.toString() + "rem" };

  return (
    <div className="flex h-full flex-row place-items-center">
      <span style={logoStyleObj} className="text-primary">
        Code
      </span>
      <span style={logoStyleObj}>Diary</span>
      <Code
        className="text-primary"
        sx={{ fontSize: (1.65 * rem).toString() + "rem" }}
      />
    </div>
  );
};

export default Logo;
