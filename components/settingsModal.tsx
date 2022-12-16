import { useAuth, UsernameRegex } from "@contexts/authContext";

import { possibleThemes, ThemeContext } from "@contexts/themeContext";

import { db } from "@lib/firebase";

import { ButtonHandler, converter, UserPublicDoc } from "@lib/types";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import { FirebaseError } from "firebase/app";

import { doc, updateDoc } from "firebase/firestore";

import { FC, useContext, useState } from "react";

export type SettingsModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const SettingsModal: FC<SettingsModalProps> = ({ modalOpen, setModalOpen }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { userData, currentUser } = useAuth();

  const [error, setError] = useState("");
  const [color, setColor] = useState(userData.profileColor);
  const [colorLoading, setColorLoading] = useState(false);
  const [username, setUsername] = useState(userData.username);
  const [usernameLoading, setUsernameLoading] = useState(false);

  function getPublicDocRef(uid: string) {
    const ref = doc(db, "users", uid);
    return ref.withConverter(converter<UserPublicDoc>());
  }

  const submitColor: ButtonHandler = async (e) => {
    e.preventDefault();
    setColorLoading(true);
    try {
      await updateDoc(getPublicDocRef(currentUser!.uid), {
        profileColor: color!,
      });
    } catch (err) {
      setError((err as FirebaseError).message);
      setColorLoading(false);
      return;
    }
    setError("");
    setColorLoading(false);
  };

  const submitUsername: ButtonHandler = async (e) => {
    e.preventDefault();
    setUsernameLoading(true);
    if (username?.match(UsernameRegex) === null) {
      setError(
        "You can only use letters, numbers and '-' and '_' characters in usernames!",
      );
      return;
    }
    try {
      await updateDoc(getPublicDocRef(currentUser!.uid), {
        username: username!,
      });
    } catch (err) {
      setError((err as FirebaseError).message);
      setUsernameLoading(false);
      return;
    }
    setError("");
    setUsernameLoading(false);
  };

  return (
    <>
      <input
        type="checkbox"
        checked={modalOpen}
        className="modal-toggle"
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            <CloseRoundedIcon className="h-full w-full" />
          </button>
          <h2 className="mb-4 text-2xl">Settings</h2>
          <h3 className="mb-2 text-lg">Username</h3>
          <span className="mb-6 flex h-8 w-full items-center gap-4">
            <input
              type="text"
              required
              placeholder="username"
              minLength={3}
              maxLength={15}
              pattern={UsernameRegex.source}
              className="input-bordered input-primary input input-sm w-48"
              value={username ?? "username"}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <button
              className="btn-primary btn-sm btn ml-auto mr-14 w-44"
              disabled={usernameLoading}
              onClick={submitUsername}
            >
              Change username
            </button>
          </span>
          <h3 className="mb-2 text-lg">User color</h3>
          <span className="mb-6 flex h-8 w-full items-center gap-4">
            <input
              required
              type="color"
              placeholder="Category Name"
              className="border-px h-full w-48 border border-primary p-px"
              value={color ?? "#808080"}
              onChange={(e) => {
                setColor(e.target.value);
              }}
            />
            <button
              className="btn-primary btn-sm btn ml-auto mr-14 w-44"
              disabled={colorLoading}
              onClick={submitColor}
            >
              Change color
            </button>
          </span>
          <h3 className="mb-2 text-lg">Pick a theme!</h3>
          <p className="text-md mb-4 font-bold">
            You are currently using the{" "}
            <span className="text-primary">{theme}</span> theme.
          </p>
          <span className="grid-cols grid grid-cols-3 gap-4">
            {possibleThemes.map((theme) => (
              <div
                key={theme}
                onClick={() => {
                  setTheme(theme);
                }}
                data-theme={theme}
                className="flex flex-col items-center justify-center rounded-lg border border-primary p-0 hover:cursor-pointer"
              >
                <span className="h-min w-min p-4">{theme}</span>
                <div className="m-0 flex h-6 w-full flex-row overflow-hidden rounded-b-lg">
                  <span className="h-full flex-1 bg-primary" />
                  <span className="h-full flex-1 bg-secondary" />
                  <span className="h-full flex-1 bg-accent" />
                  <span className="h-full flex-1 bg-neutral" />
                  <span className="h-full flex-1 bg-base-100" />
                  <span className="h-full flex-1 bg-info" />
                  <span className="h-full flex-1 bg-warning" />
                  <span className="h-full flex-1 bg-success" />
                  <span className="h-full flex-1 bg-error" />
                </div>
              </div>
            ))}
          </span>
          {error ? (
            <div className="flex flex-col">
              <div className="alert alert-error mt-3 inline">
                <button
                  className="float-right mb-auto mt-0 h-full"
                  onClick={() => {
                    setError("");
                  }}
                >
                  <CloseRoundedIcon />
                </button>
                <p className="block overflow-hidden text-ellipsis whitespace-normal break-words">
                  {error}
                </p>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
