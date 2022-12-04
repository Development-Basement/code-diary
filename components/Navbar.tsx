import React, { FC } from "react";
import Logo from "./Logo";
import { Add } from "@mui/icons-material";

type NavbarProps = {
  currentDirectory?: string;
};

const Navbar: FC<NavbarProps> = ({ currentDirectory = "" }) => {
  return (
    <div
      className="flex flex-auto bg-neutral"
      style={{
        padding: 5,
        paddingLeft: 15,
        paddingRight: "15vw",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Logo rem={1} />
      </div>
      <div
        className="flex"
        style={{
          width: "50vw",
          justifyContent: "space-between",
        }}
      >
        <span>{currentDirectory}</span>
        <div>
          <div>{/* TODO: Profile Picture */}</div>
          <Add></Add>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
