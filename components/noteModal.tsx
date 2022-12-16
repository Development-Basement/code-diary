import Stars from "@components/stars";
import TagLabel from "@components/tag";
import { FormSubmitHandler, TagId, TagMap } from "@lib/types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { FC } from "react";

export type NodeModalProps = {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  language: string;
  setLanguage: (value: string) => void;
  duration: number | undefined;
  setDuration: (value: number) => void;
  description: string;
  setDescription: (value: string) => void;
  date: Date;
  setDate: (value: Date) => void;
  time: number;
  setTime: (value: number) => void;
  tags: TagMap;
  tagsSelection: Array<TagId>;
  addTag: (value: TagId) => void;
  removeTag: (value: TagId) => void;
  rating: number;
  setRating: (value: number) => void;
  onSubmit: FormSubmitHandler;
};

const NodeModal: FC<NodeModalProps> = ({
  modalOpen,
  setModalOpen,
  language,
  setLanguage,
  duration,
  setDuration,
  description,
  setDescription,
  date,
  setDate,
  time,
  setTime,
  tags,
  tagsSelection,
  addTag,
  removeTag,
  rating,
  setRating,
  onSubmit,
}) => {
  return (
    <>
      <input
        type="checkbox"
        checked={modalOpen}
        readOnly
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative overflow-x-hidden">
          <button
            onClick={() => {
              setModalOpen(false);
            }}
            className="btn-sm btn-circle btn absolute right-2 top-2 p-1"
          >
            <CloseRoundedIcon className="h-full w-full" />
          </button>
          <h3 className="text-lg font-bold">Add new Note</h3>
          <form
            className="my-4 flex w-full flex-col justify-center gap-2 text-center"
            onSubmit={onSubmit}
          >
            <input
              required
              placeholder="language"
              className="input-bordered input-primary input"
              value={language}
              min={1}
              pattern={/^[a-zA-Z0-9-_]{1,20}$/.source}
              onChange={(e) => {
                setLanguage(e.target.value);
              }}
            />
            <input
              required
              placeholder="duration (in minutes)"
              type="number"
              min={0}
              step={1}
              className="input-bordered input-primary input input-md"
              value={duration}
              onChange={(e) => {
                setDuration(Number(e.target.value));
              }}
            />
            <textarea
              placeholder="description"
              className="textarea-primary textarea"
              maxLength={500}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <input
              type="date"
              className="input-bordered input-primary input input-md"
              value={date.toISOString()}
              onChange={(e) => {
                setDate(e.target.valueAsDate!);
              }}
            />
            <input
              type="time"
              className="input-bordered input-primary input input-md"
              value={time}
              onChange={(e) => {
                setTime(Number(e.target.value));
              }}
            />
            <span className="flex flex-row justify-between">
              <div className=" flex w-full flex-row items-center overflow-auto overflow-y-hidden rounded-lg border border-primary pl-2">
                {tagsSelection.length != 0 ? (
                  tagsSelection.map((tagId) => (
                    <button
                      className="btn-ghost btn-sm btn"
                      key={tagId}
                      onClick={(e) => {
                        e.preventDefault();
                        removeTag(tagId);
                      }}
                    >
                      <TagLabel {...tags[tagId]} tooltip={false} />
                      <CloseRoundedIcon />
                    </button>
                  ))
                ) : (
                  <span className="m-auto">Select Categories</span>
                )}
              </div>
              <div className="dropdown-hover dropdown-top dropdown-end dropdown max-w-max">
                <label tabIndex={0} className="btn ml-4">
                  <ArrowDropDownIcon />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu rounded-box w-52 border border-black bg-base-100 p-2 shadow"
                >
                  {Object.entries(tags)
                    .filter((t) => !tagsSelection.includes(t[0]))
                    .map(([id, data], index) => (
                      <button
                        className="btn-ghost btn-sm btn hover:cursor-pointer"
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          addTag(id);
                        }}
                      >
                        <TagLabel {...data} tooltip="left" />
                      </button>
                    ))}
                </ul>
              </div>
            </span>
            <div className="mb-4 flex items-center gap-2 justify-self-start">
              <p>How did you like it?</p>
              <Stars rating={rating} setRating={setRating} />
            </div>
            <button type="submit" className="btn-primary btn w-full">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default NodeModal;
