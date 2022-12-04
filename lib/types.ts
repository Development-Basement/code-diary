import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import {
  QueryDocumentSnapshot as AQueryDocumentSnapshot,
  DocumentData as ADocumentData,
  FirestoreDataConverter as AFirestoreDataConverter,
} from "firebase-admin/firestore";
import React from "react";

export type ButtonHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
) => void;

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
