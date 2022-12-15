import Note from "@components/note";
import NoteModal from "@components/noteModal";
import SettingsModal from "@components/settingsModal";
import Sidebar from "@components/sidebar";
import Topbar from "@components/topbar";
import { useAuth } from "@contexts/authContext";
import { db } from "@lib/firebase";
import {
  converter,
  FormSubmitHandler,
  Record,
  Tag,
  TagId,
  TagMap,
  UserId,
} from "@lib/types";
import { collection, onSnapshot } from "firebase/firestore";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const { userData, currentUser } = useAuth();

  // DB data
  const [tags, setTags] = useState<TagMap>({});
  const [records, setRecords] = useState<Array<Record>>([]);
  // modals
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [noteModalOpen, setNoteModalOpen] = useState<boolean>(false);
  // note modal data
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState(2);
  const [duration, setDuration] = useState<number>();
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date()); // TODO: change to datetime
  const [time, setTime] = useState(10);
  const [tagsSelection, setTagsSelection] = useState<Array<TagId>>([]);
  // tag filtering
  const [disabledTags, setDisabledTags] = useState<Array<TagId>>([]);

  const getUserRecordsRef = (uid: UserId) => {
    return collection(db, "userRecords", uid, "records").withConverter(
      converter<Record>(),
    );
  };
  const getUserTagsRef = (uid: UserId) => {
    return collection(db, "userRecords", uid, "tags").withConverter(
      converter<Tag>(),
    );
  };

  const addTag = (id: TagId) => {
    if (!tagsSelection.includes(id)) {
      setTagsSelection((prev) => [id, ...prev]);
    }
  };

  const removeTag = (id: TagId) => {
    setTagsSelection((prev) => prev.filter((t) => t != id));
  };

  const noteModalSubmitHandle: FormSubmitHandler = (e) => {
    e.preventDefault();
    // do conditional logic here
    setNoteModalOpen(false);
  };

  useEffect(() => {
    if (currentUser == null) {
      return;
    }
    const tagsUnsub = onSnapshot(getUserTagsRef(currentUser.uid), (snap) => {
      const newTags: TagMap = {};
      snap.docs.forEach((doc) => {
        newTags[doc.id] = doc.data();
      });
      setTags(newTags);
    });
    const recordsUnsub = onSnapshot(
      getUserRecordsRef(currentUser.uid),
      (snap) => {
        const newRecords: Array<Record> = [];
        snap.docs.forEach((doc) => {
          newRecords.push(doc.data());
        });
        // sort the records to get the newest on the start
        newRecords.sort((a, b) => (a.date > b.date ? 1 : -1));
        setRecords(newRecords);
      },
    );
    return () => {
      tagsUnsub();
      recordsUnsub();
    };
  }, [currentUser]); // technically redundant

  return (
    <div className="flex h-screen w-screen flex-col bg-base-100">
      <Topbar
        settingsOnClick={(e) => {
          e.preventDefault();
          setSettingsOpen(true);
        }}
        addNewOnClick={(e) => {
          e.preventDefault();
          setNoteModalOpen(true);
        }}
      />
      <main className="flex grow flex-row overflow-y-hidden">
        <Sidebar
          tags={tags}
          disabledTags={disabledTags}
          setDisabledTags={setDisabledTags}
        />
        <div className="z-10 mx-auto w-1/2 snap-y scroll-pt-3 space-y-4 overflow-y-auto scroll-smooth bg-neutral py-3 px-1 shadow-xl shadow-base-content/10">
          {records
            // only those, that have some tag enabled
            .filter((r) => r.tags.some((t) => !disabledTags.includes(t)))
            .map((record) => (
              <Note
                {...record}
                username={userData.username}
                userColor={userData.profileColor}
                tags={record.tags
                  .map((tagId) => tags[tagId])
                  .filter((t) => t !== undefined)}
                key={JSON.stringify(record)}
              />
            ))}
        </div>
      </main>
      <NoteModal
        modalOpen={noteModalOpen}
        setModalOpen={setNoteModalOpen}
        language={language}
        setLanguage={setLanguage}
        duration={duration}
        setDuration={setDuration}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        time={time}
        setTime={setTime}
        tags={tags}
        tagsSelection={tagsSelection}
        addTag={addTag}
        removeTag={removeTag}
        rating={rating}
        setRating={setRating}
        onSubmit={noteModalSubmitHandle}
      />
      <SettingsModal modalOpen={settingsOpen} setModalOpen={setSettingsOpen} />
    </div>
  );
};

export default Home;
