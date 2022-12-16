import CodeIcon from "@mui/icons-material/Code";
import { FC } from "react";

type LogoProps = {
  rem?: number;
};

const Logo: FC<LogoProps> = ({ rem = 1 }) => {
  return (
    <div className="flex h-full flex-row place-items-center font-bold">
      <span style={{ fontSize: `${rem}rem` }}>
        <span className="text-primary">Code</span>
        Diary
      </span>
      <CodeIcon
        className="text-primary"
        sx={{ fontSize: `${rem * 1.65}rem` }}
      />
    </div>
  );
};

export default Logo;
