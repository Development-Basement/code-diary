import React from "react";

export type ButtonHandler = (
  event: React.MouseEvent<HTMLButtonElement>,
) => void;

type FirestoreSnapshot = FirebaseFirestore.QueryDocumentSnapshot;

export const defaultConverter = <T>() => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap: FirestoreSnapshot) => snap.data() as T,
});
