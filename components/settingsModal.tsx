import { possibleThemes, ThemeContext } from "@contexts/themeContext";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FC, useContext } from "react";

export type SettingsModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
};

const SettingsModal: FC<SettingsModalProps> = ({ modalOpen, setModalOpen }) => {
  const { theme, setTheme } = useContext(ThemeContext);

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
          <h2 className="mb-4 text-lg font-bold">Settings</h2>
          <h3 className="text-md mb-4 font-bold">
            You are currently using the{" "}
            <span className="text-primary">{theme}</span> theme.
          </h3>
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
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
