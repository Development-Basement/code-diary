import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import React from "react";

export type ButtonHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
) => void;

// Firestore

type FirestoreSnapshot = QueryDocumentSnapshot<DocumentData>;
export type FirestoreMap<T> = {
  [P: string]: T;
};

export const converter = <T>() => {
  return {
    toFirestore: (data: T) => data,
    fromFirestore: (snap: FirestoreSnapshot) => snap.data() as T,
  } as FirestoreDataConverter<T>;
};

// Database

type UserId = string;
type GroupId = string;
type Color = string;

export type AllUsersDoc = {
  /** UserId -> string */
  users: FirestoreMap<UserId>;
};

export type UserDoc = {
  groups: Array<GroupId>;
  /** GroupId -> UserId */
  invites: FirestoreMap<UserId>;
  profileColor: Color;
  username: string;
};
