import React, { useContext, useState, useEffect } from "react";

import { auth, db } from "../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  onSnapshot,
  where,
  deleteDoc,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import firebaseApp from "../lib/firebase";
import { Auth } from "firebase-admin/auth";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: JSX.Element }) {
  const auth = getAuth(firebaseApp);

  const [user, loading, error] = useAuthState(auth);

  const usersRef = collection(db, "users");

  type basicUserDataType = {
    email: string;
    password: string;
  };

  interface createUserDataType extends basicUserDataType {
    username: string;
  }

  async function createAccount({
    email,
    username,
    password,
  }: createUserDataType) {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (response) => {
        await setDoc(doc(db, "users/accountInfo/_public/", response.user.uid), {
          email,
          username,
        });
      },
    );
  }

  async function login({ email, password }: basicUserDataType) {
    if (email) await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error("User not in database");
    }
  }

  async function changePassword(newPassword: string) {
    // should only be called by current user and shortly after authenticating
    if (user) await updatePassword(user, newPassword);
  }

  async function changeUsername(newUsername: string) {
    if (await isUsernameInUserDatabase(newUsername)) {
      throw new Error("Username already in database");
    }
    if (user) {
      const userDoc = await getDoc(
        doc(db, "users/accountInfo/_public/", user.uid),
      );
      if (userDoc) {
        await updateDoc(doc(db, "users/accountInfo/_public/", userDoc.id), {
          username: newUsername,
        });
      } else {
        throw new Error("User not in database");
      }
    }
  }

  async function isUsernameInUserDatabase(username: string) {
    const q = query(usersRef, where("username", "==", username));
    let response = false;
    await getDocs(q).then((docs) => {
      response = !docs.empty;
    });
    return response;
  }

  const value = {
    user,
    createAccount,
    login,
    logout,
    resetPassword,
    changePassword,
    changeUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      <>{!loading && !error && user && children}</>
      <>{error && <p>error</p>}</>
      <>{loading && <p>loading</p>}</>
      <>{!user && <p>no user</p>}</>
    </AuthContext.Provider>
  );
}
