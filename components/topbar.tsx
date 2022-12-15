import Logo from "@components/logo";
import { useAuth } from "@contexts/authContext";
import { auth } from "@lib/firebase";
import { ButtonHandler } from "@lib/types";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { FC } from "react";
import { useSignOut } from "react-firebase-hooks/auth";

export type TopbarProps = {
  addNewOnClick: ButtonHandler;
  settingsOnClick: ButtonHandler;
};

const Topbar: FC<TopbarProps> = ({ addNewOnClick, settingsOnClick }) => {
  const { userData } = useAuth();

  const [logout, loading, error] = useSignOut(auth);

  return (
    <div className="z-50 flex h-16 w-screen flex-row gap-x-4 bg-neutral text-neutral-content shadow-lg shadow-base-content/5">
      <span className="w-64px px-3">
        <Logo rem={2} />
      </span>
      <span className="mx-auto my-auto flex w-1/2 flex-row justify-end">
        <button
          className="my-auto flex h-8 w-8 items-center justify-center rounded-full bg-primary hover:opacity-75"
          onClick={addNewOnClick}
        >
          <AddIcon className="h-8 w-8" />
        </button>
        <div className="dropdown-end dropdown" id="settings-dropdown">
          <button
            tabIndex={0}
            style={{
              backgroundColor: userData.profileColor ?? "grey",
            }}
            className="my-auto ml-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary hover:opacity-75"
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box w-52 gap-2 bg-base-100 p-2 shadow"
          >
            <li className="mt-3 flex flex-row items-center justify-start border-b border-neutral pb-5 hover:cursor-default">
              <span
                tabIndex={0}
                style={{
                  backgroundColor: userData.profileColor ?? "grey",
                  borderRadius: "50%",
                }}
                className="ml-3 mr-2 flex h-8 w-8 items-center justify-center hover:cursor-default"
              />
              {userData.username ?? "No username?"}
            </li>
            <li>
              <button
                className="btn-ghost btn justify-start"
                onClick={settingsOnClick}
              >
                <SettingsIcon />
                Settings
              </button>
            </li>
            <li>
              <button
                className="btn-ghost btn justify-start text-error"
                onClick={() => {
                  logout();
                }}
              >
                <LogoutIcon />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </span>
    </div>
  );
};

export default Topbar;
