import {
  DocumentData as ADocumentData,
  FirestoreDataConverter as AFirestoreDataConverter,
  QueryDocumentSnapshot as AQueryDocumentSnapshot,
} from "firebase-admin/firestore";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import React from "react";

type PossiblyAsync<T> = T | Promise<T>;

export type ButtonHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
) => PossiblyAsync<void>;

export type FormSubmitHandler = (
  event: React.FormEvent<HTMLFormElement>,
) => PossiblyAsync<void>;

export type TagMap = { [id: TagId]: Tag };
export type RecordMap = {
  [id: RecordId]: Record;
};

// Firestore

type FirestoreSnapshot =
  | AQueryDocumentSnapshot<ADocumentData>
  | QueryDocumentSnapshot<DocumentData>;
export type FirestoreMap<T> = {
  [P: string]: T;
};

export const aConverter = <T>() => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snap: FirestoreSnapshot) => snap.data() as T,
  } as AFirestoreDataConverter<T>;
};

export const converter = <T>() => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snap: FirestoreSnapshot) => snap.data() as T,
  } as FirestoreDataConverter<T>;
};

// Database

export type UserId = string;
export type GroupId = string;
export type TagId = string;
export type Color = string;
export type RecordId = string;

export type Tag = {
  description: string;
  name: string;
  tagColor: Color;
};

export type Record = {
  date: Timestamp;
  description: string;
  language: string;
  minutesSpent: number;
  rating: number;
  tags: Array<string>;
};

export type UserPublicDoc = {
  profileColor: Color;
  username: string;
};

export type UserPrivateDoc = {
  groups: Array<GroupId>;
  invites: Array<GroupId>;
};
