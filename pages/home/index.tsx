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
  RecordId,
  RecordMap,
  Tag,
  TagId,
  TagMap,
  UserId,
} from "@lib/types";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  onSnapshot,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { NextPage } from "next";

import { useEffect, useRef, useState } from "react";

const Home: NextPage = () => {
  const { userData, currentUser } = useAuth();

  // DB data
  const [tags, setTags] = useState<TagMap>({});
  const [records, setRecords] = useState<RecordMap>({});
  // modals
  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [noteModalOpen, setNoteModalOpen] = useState<boolean>(false);
  const noteModalFirst = useRef<HTMLInputElement>(null);
  // note modal data
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingRecord, setEditingRecord] = useState<RecordId | null>(null);
  const [language, setLanguage] = useState("");
  const [rating, setRating] = useState(2);
  const [duration, setDuration] = useState(10);
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [tagsSelection, setTagsSelection] = useState<Array<TagId>>([]);
  // tag filtering
  const [filteringEnabled, setFilteringEnabled] = useState(false);
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

  const fillModal = ({
    dateTime: fDateTime = new Date(),
    description: fDescription = "",
    language: fLanguage = "",
    minutesSpent = 10,
    rating: fRating = 2,
    tags: fTags = [],
  }: {
    dateTime?: Date;
    description?: string;
    language?: string;
    minutesSpent?: number;
    rating?: number;
    tags?: Array<string>;
  }) => {
    setDateTime(fDateTime);
    setDescription(fDescription);
    setLanguage(fLanguage);
    setDuration(minutesSpent);
    setRating(fRating);
    setTagsSelection(fTags);
  };

  const openCreateNewNote = () => {
    fillModal({});
    setEditingRecord(null);
    setNoteModalOpen(true);
    setTimeout(() => {
      noteModalFirst.current?.focus();
    }, 50);
  };

  const openEditNote = (id: RecordId) => {
    const editedRecord = records[id];
    if (editedRecord === undefined) return;
    fillModal({
      ...editedRecord,
      dateTime: editedRecord.date.toDate(),
    });
    setEditingRecord(id);
    setNoteModalOpen(true);
  };

  const noteModalSubmitHandle: FormSubmitHandler = async (e) => {
    e.preventDefault();
    const recordsRef = getUserRecordsRef(currentUser!.uid);
    const recordData: Record = {
      date: Timestamp.fromDate(dateTime),
      description,
      language,
      minutesSpent: duration,
      rating,
      tags: tagsSelection,
    };
    if (
      Number.isNaN(recordData.minutesSpent) ||
      !Number.isFinite(recordData.minutesSpent)
    ) {
      setError("Please specify a finite number");
      return;
    }
    setLoading(true);
    try {
      if (editingRecord) {
        await updateDoc(
          doc(db, recordsRef.path, editingRecord).withConverter(
            converter<Record>(),
          ),
          recordData,
        );
      } else {
        await addDoc(recordsRef, recordData);
      }
    } catch (err) {
      setError((err as FirestoreError).message);
    }
    setLoading(false);
    setError("");
    setNoteModalOpen(false);
  };

  const deleteRecordHandle = async (id: RecordId) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, getUserRecordsRef(currentUser!.uid).path, id));
    } catch (err) {
      setError((err as FirestoreError).message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError("");
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
        const newRecords: RecordMap = {};
        snap.docs.forEach((doc) => {
          newRecords[doc.id] = doc.data();
        });
        // sort the records to get the newest on the start
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
          openCreateNewNote();
        }}
      />
      <main className="flex grow flex-row overflow-y-hidden">
        <Sidebar
          tags={tags}
          disabledTags={disabledTags}
          setDisabledTags={setDisabledTags}
          filteringEnabled={filteringEnabled}
          setFilteringEnabled={setFilteringEnabled}
        />
        <div className="z-10 mx-auto w-1/2 snap-y scroll-pt-3 space-y-4 overflow-y-auto scroll-smooth bg-neutral py-3 px-1 shadow-xl shadow-base-content/10">
          {Object.entries(records)
            // only those, that have some tag enabled
            .filter(
              ([, r]) =>
                !filteringEnabled ||
                r.tags.some((t) => !disabledTags.includes(t)),
            )
            .sort(([, a], [, b]) => (a.date > b.date ? 1 : -1))
            .map(([id, record]) => (
              <Note
                {...record}
                username={userData.username}
                userColor={userData.profileColor}
                tags={record.tags
                  .map((tagId) => tags[tagId])
                  .filter((t) => t !== undefined)}
                key={id}
                onClick={() => {
                  openEditNote(id);
                }}
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
        dateTime={dateTime}
        setDateTime={setDateTime}
        tags={tags}
        tagsSelection={tagsSelection}
        addTag={addTag}
        removeTag={removeTag}
        rating={rating}
        setRating={setRating}
        onSubmit={noteModalSubmitHandle}
        deleteRecordHandle={deleteRecordHandle}
        editingRecord={editingRecord}
        loading={loading}
        error={error}
        setError={setError}
        firstRef={noteModalFirst}
      />
      <SettingsModal modalOpen={settingsOpen} setModalOpen={setSettingsOpen} />
    </div>
  );
};

export default Home;
