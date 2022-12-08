import {
  DocumentData as ADocumentData,
  FirestoreDataConverter as AFirestoreDataConverter,
  QueryDocumentSnapshot as AQueryDocumentSnapshot,
} from "firebase-admin/firestore";
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
export type Color = string;

export type AllUsersDoc = {
  /** UserId -> string */
  users: FirestoreMap<UserId>;
};

export type UserPublicDoc = {
  profileColor: Color;
  username: string;
};

export type UserPrivateDoc = {
  groups: Array<GroupId>;
  invites: Array<GroupId>;
};
