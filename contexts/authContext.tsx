import { auth, db } from "@lib/firebase";

import {
  Color,
  converter,
  FirestoreMap,
  GroupId,
  UserId,
  UserPrivateDoc,
  UserPublicDoc,
} from "@lib/types";

import { createUserWithEmailAndPassword, User } from "firebase/auth";

import {
  collection,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import React, { useContext, useEffect, useState } from "react";

import { useAuthState } from "react-firebase-hooks/auth";

export type AuthContextProps = {
  currentUser: User | null;
  userData: (UserPublicDoc & UserPrivateDoc) | null;
  createAccountWithEmail: (
    username: string,
    email: string,
    password: string,
    profileColor?: Color,
  ) => Promise<void>;
  changeUsername: (newUsername: string) => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps>({
  currentUser: null,
  userData: null,
  createAccountWithEmail: async ({}) => {
    console.error(
      "createAccountWithEmail called too soon! (this should never happen)",
    );
  },
  changeUsername: async ({}) => {
    console.error("changeUsername called too soon! (this should never happen)");
  },
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, , error] = useAuthState(auth);

  const [username, setUsername] = useState<string | null>(null);
  const [profileColor, setProfileColor] = useState<Color | null>(null);
  const [groups, setGroups] = useState<Array<GroupId>>([]);
  const [invites, setInvites] = useState<FirestoreMap<UserId>>({});

  function generateRandomColor(): Color {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  function getPublicDocRef(uid: string) {
    const ref = doc(db, "users", "accountInfo", "public", uid);
    return ref.withConverter(converter<UserPublicDoc>());
  }

  function getPrivateDocRef(uid: string) {
    const ref = doc(db, "users", "accountInfo", "private", uid);
    return ref.withConverter(converter<UserPrivateDoc>());
  }

  async function isUsernameInUserDatabase(username: string) {
    const q = query(
      collection(db, "users", "accountInfo", "public"),
      where("username", "==", username),
      limit(1),
    ).withConverter(converter<UserPublicDoc>());
    let response = false;
    await getDocs(q).then((res) => {
      response = !res.docs.every((_doc) => _doc.id === user?.uid);
    });
    return response;
  }

  async function createAccountWithEmail(
    email: string,
    username: string,
    password: string,
    profileColor?: Color,
  ) {
    if (username.match(/^[a-zA-Z0-9-_]{3,15}$/) === null) {
      throw new Error("Username is not valid");
    }
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await Promise.all([
      setDoc(getPublicDocRef(res.user.uid), {
        username,
        profileColor: profileColor || generateRandomColor(),
      }),
      setDoc(getPrivateDocRef(res.user.uid), {
        groups: [],
        invites: {},
      }),
    ]);
  }

  async function changeUsername(newUsername: string) {
    if (await isUsernameInUserDatabase(newUsername)) {
      throw new Error("Username already in database");
    }
    if (user) {
      if (newUsername.match(/^[a-zA-Z0-9-_]{3,15}$/) === null) {
        throw new Error("Username is not valid");
      }
      await updateDoc(getPublicDocRef(user.uid), {
        username: newUsername,
      });
    }
  }

  useEffect(() => {
    if (user) {
      const pubUnsub = onSnapshot(
        getPublicDocRef(user.uid),
        (pubDoc) => {
          const data = pubDoc.data();
          if (data === undefined) {
            return;
          }
          setUsername(data.username);
          setProfileColor(data.profileColor);
        },
        (err) => {
          console.error(err.message, err.cause);
          console.debug(err);
        },
      );
      const privUnsub = onSnapshot(
        getPrivateDocRef(user.uid),
        (privDoc) => {
          const data = privDoc.data();
          if (data === undefined) {
            return;
          }
          setGroups(data.groups);
          setInvites(data.invites);
        },
        (err) => {
          console.error(err.message, err.cause);
          console.debug(err);
        },
      );
      return () => {
        privUnsub();
        pubUnsub();
      };
    }
    setUsername(null);
    setProfileColor(null);
    setInvites({});
    setGroups([]);
  }, [user]);

  const value: AuthContextProps = {
    currentUser: user === undefined ? null : user,
    userData:
      username === null || profileColor === null
        ? null
        : {
            username,
            profileColor,
            groups,
            invites,
          },
    createAccountWithEmail,
    changeUsername,
  };

  // TODO: better error handling here, probably a toast
  return (
    <AuthContext.Provider value={value}>
      {children}
      {error && <p>error</p>}
    </AuthContext.Provider>
  );
}
