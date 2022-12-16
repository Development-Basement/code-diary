import TagLabel from "@components/tag";
import { useAuth } from "@contexts/authContext";
import { db } from "@lib/firebase";
import {
  Color,
  converter,
  FormSubmitHandler,
  Tag,
  TagId,
  TagMap,
  UserId,
} from "@lib/types";
import AddIcon from "@mui/icons-material/Add";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FC, useRef, useState } from "react";

export type SidebarProps = {
  tags: TagMap;
  disabledTags: Array<TagId>;
  setDisabledTags: (tags: Array<TagId>) => void;
};

const Sidebar: FC<SidebarProps> = ({ tags, disabledTags, setDisabledTags }) => {
  const { userData, currentUser } = useAuth();

  const [addNewModal, setAddNewModal] = useState(false);
  const [editingTag, setEditingTag] = useState<TagId | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tagDescription, setTagDescription] = useState("");
  const [tagName, setTagName] = useState("");
  const [tagColor, setTagColor] = useState<Color>(
    userData.profileColor ?? "gray",
  );

  const nameRef = useRef<HTMLInputElement>(null);

  const getTagsCollection = (uid: UserId) => {
    return collection(db, "userRecords", uid, "tags").withConverter(
      converter<Tag>(),
    );
  };

  const isTagNameUnique = async (name: string) => {
    console.log(editingTag);
    const q = query(
      getTagsCollection(currentUser!.uid),
      where("name", "==", name),
      limit(1),
    ).withConverter(converter<Tag>());
    let isInDb = false;
    let isEdited = false;
    await getDocs(q).then((res) => {
      isInDb = res.docs.every((_doc) => _doc.data().name === name);
      isEdited = res.docs.every((_doc) => _doc.id === editingTag);
    });
    console.log(isEdited, isInDb);
    return isEdited ? true : !isInDb;
  };

  const addDisabledTag = (id: TagId) => {
    if (!disabledTags.includes(id)) {
      setDisabledTags([id, ...disabledTags]);
    }
  };
  const removeDisabledTag = (id: TagId) => {
    if (disabledTags.includes(id)) {
      setDisabledTags(disabledTags.filter((t) => t !== id));
    }
  };

  const openCreateNewTag = () => {
    fillModal({});
    setEditingTag(null);
    setAddNewModal(true);
    setTimeout(() => {
      nameRef.current?.focus();
    }, 50);
  };

  const openEditNewTag = (id: TagId) => {
    const editedTag = tags[id];
    if (editedTag === undefined) return;
    fillModal({
      name: editedTag.name,
      color: editedTag.tagColor,
      description: editedTag.description,
    });
    setEditingTag(id);
    setAddNewModal(true);
  };

  const fillModal = ({
    name = "",
    color = undefined,
    description = "",
  }: {
    name?: string;
    color?: Color;
    description?: string;
  }) => {
    if (color === undefined) color = userData.profileColor ?? "gray";
    setTagColor(color);
    setTagName(name);
    setTagDescription(description);
  };

  const addNewCategorySubmitHandle: FormSubmitHandler = async (e) => {
    e.preventDefault();
    const tagsRef = getTagsCollection(currentUser!.uid);
    setLoading(true);
    if (!(await isTagNameUnique(tagName))) {
      setError("This tag name already exists!");
      setLoading(false);
      return;
    }
    const tagData = {
      description: tagDescription,
      name: tagName,
      tagColor: tagColor,
    };
    try {
      if (editingTag) {
        await updateDoc(
          doc(db, tagsRef.path, editingTag).withConverter(converter<Tag>()),
          tagData,
        );
      } else {
        await addDoc(tagsRef, tagData);
      }
    } catch (err) {
      setError((err as FirestoreError).message);
    }
    setLoading(false);
    setError("");
    setAddNewModal(false);
  };

  const deleteTagHandle = async (id: TagId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, getTagsCollection(currentUser!.uid).path, id));
    } catch (err) {
      setError((err as FirestoreError).message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError("");
    setAddNewModal(false);
  };

  return (
    <div className="flex h-full w-64 flex-col bg-neutral p-3 text-neutral-content">
      <div id="tag-modal">
        <input
          type="checkbox"
          checked={addNewModal}
          readOnly
          className="modal-toggle"
        />
        <div className="modal">
          <div className="modal-box relative">
            <button
              onClick={() => {
                setAddNewModal(false);
              }}
              className="btn-sm btn-circle btn absolute right-2 top-2 p-1"
            >
              <CloseRoundedIcon className="h-full w-full" />
            </button>
            <h3 className="text-lg font-bold">
              {editingTag ? "Edit" : "Add new"} category
            </h3>
            <form
              action=""
              className="my-4 flex w-full flex-col justify-center gap-2 text-center"
              onSubmit={(e) => {
                addNewCategorySubmitHandle(e);
              }}
            >
              <input
                required
                type="text"
                placeholder="name"
                className="input-bordered input-primary input"
                value={tagName}
                ref={nameRef}
                pattern={/^[a-zA-Z0-9-_]{1,20}$/.source}
                onChange={(e) => {
                  setTagName(e.target.value);
                }}
              />
              <textarea
                placeholder="description"
                className="textarea-primary textarea"
                maxLength={80}
                value={tagDescription}
                onChange={(e) => {
                  setTagDescription(e.target.value);
                }}
              />
              <div className="flex h-6 flex-row items-center">
                <span className="mr-4 ml-2">Pick a color!</span>
                <input
                  required
                  type="color"
                  placeholder="Category Name"
                  className="border-px h-full w-20 border border-primary p-px"
                  value={tagColor}
                  onChange={(e) => {
                    setTagColor(e.target.value);
                  }}
                />
              </div>
              <div className="my-2 flex h-6 flex-row items-center">
                <span className="mr-4 ml-2">
                  Your new category will look like this:
                </span>
                <TagLabel
                  description={tagDescription}
                  name={tagName || "category"}
                  tagColor={tagColor}
                />
              </div>
              {error ? (
                <div className="alert alert-error mb-2 inline">
                  <button
                    className="float-right"
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
              ) : (
                <></>
              )}
              <span className="flex gap-2">
                <button
                  type="submit"
                  className="btn-primary btn flex-auto"
                  disabled={loading}
                >
                  {editingTag ? "Submit" : "Add"}
                </button>
                {editingTag ? (
                  <button
                    type="button"
                    className="btn-error btn max-w-fit"
                    onClick={() => {
                      deleteTagHandle(editingTag);
                    }}
                  >
                    <DeleteForeverIcon className="h-full" />
                    Delete
                  </button>
                ) : (
                  <></>
                )}
              </span>
            </form>
          </div>
        </div>
      </div>

      <nav className="flex flex-col">
        <div className="mb-8 flex h-min w-full flex-col">
          <span className="flex flex-row items-center justify-between">
            <h2 className="text-3xl">Categories</h2>
            <AddIcon
              className="hover:cursor-pointer hover:opacity-70"
              onClick={() => {
                openCreateNewTag();
              }}
            />
          </span>
          <span className="my-2 h-1 w-full bg-base-100" />
          {Object.entries(tags).map(([id, tag], index) => (
            <span key={index} className="flex h-6 w-full flex-row items-center">
              <input
                type="checkbox"
                checked={!disabledTags.includes(id)}
                className="checkbox-primary checkbox checkbox-sm mr-2"
                onChange={(e) => {
                  e.target.checked ? removeDisabledTag(id) : addDisabledTag(id);
                }}
              />
              <TagLabel {...tag} tooltip="right" />
              <button
                className="ml-auto h-full items-center"
                onClick={() => {
                  openEditNewTag(id);
                }}
              >
                <SettingsIcon className="h-full w-full place-content-center" />
              </button>
            </span>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
