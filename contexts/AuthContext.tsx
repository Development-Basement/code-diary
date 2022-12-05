import React, { useContext, useState, useEffect } from "react";

import { auth, db } from "../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  onSnapshot,
  where,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { JsxElement } from "typescript";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: JsxElement) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [dataUnsub, setDataUnsub] = useState(null);

  const [loadingAccount, setLoadingAccount] = useState(true);
  const [loadingData, setLoadingData] = useState(false);
  const [loadingNewAccount, setLoadingNewAccount] = useState(false);

  const usersRef = collection(db, "users");
  const deletedUsersRef = collection(db, "deletedUsers");

  async function findDocumentIdByUsername(username) {
    const q = query(usersRef, where("username", "==", username));
    let response = "";
    await getDocs(q).then((users) => {
      users.forEach((user) => {
        response = user.id;
      });
    });
    return response;
  }

  async function findUserEmailByUsername(username) {
    const q = query(usersRef, where("username", "==", username));
    let email = "";
    await getDocs(q).then((docs) => {
      docs.forEach((user) => {
        email = user.data().email;
      });
    });
    return email;
  }

  async function isEmailInUserDatabase(email) {
    const q = query(usersRef, where("email", "==", email));
    let response = false;
    await getDocs(q).then((docs) => {
      response = !docs.empty;
    });
    return response;
  }

  async function isUsernameInUserDatabase(username) {
    const q = query(usersRef, where("username", "==", username));
    let response = false;
    await getDocs(q).then((docs) => {
      response = !docs.empty;
    });
    return response;
  }

  async function isEmailInDeletedDatabase(email) {
    const q = query(deletedUsersRef, where("email", "==", email));
    let response = false;
    let uid = "";
    await getDocs(q).then((docs) => {
      response = !docs.empty;
      if (response) {
        docs.forEach((_doc) => {
          uid = _doc.data().uid;
        });
      }
    });
    return { response, uid };
  }

  async function createFirstAccount(email, username, password) {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (response) => {
        await setDoc(doc(db, "users", response.user.uid), {
          email,
          username,
          roles: ["manazer"],
        });
      },
    );
  }

  async function createAnotherAccount(
    newEmail,
    newUsername,
    newRoles,
    managerPassword,
    bounceTo = "/manage-accounts",
  ) {
    let willReload = false;
    let isDeleted;
    await Promise.all([
      isUsernameInUserDatabase(newUsername),
      isEmailInUserDatabase(newEmail),
      isEmailInDeletedDatabase(newEmail),
    ]).then((responses) => {
      let nameInDb = responses[0];
      let emailInDb = responses[1];
      let _isDeleted = responses[2];
      if (nameInDb) throw new Error(`Username already in database ${nameInDb}`);
      if (emailInDb) throw new Error(`Email already in database ${emailInDb}`);
      isDeleted = _isDeleted;
    });
    let newUid;
    if (isDeleted.response) {
      newUid = isDeleted.uid;
      await deleteDoc(doc(db, "deletedUsers", isDeleted.uid));
    } else {
      willReload = true;
      let managerEmail = userData.email;
      let newPassword = uuidv4();
      setLoadingNewAccount(true);
      await createUserWithEmailAndPassword(auth, newEmail, newPassword).then(
        (response) => {
          newUid = response.user.uid;
        },
      );
      await signOut(auth);
      await signInWithEmailAndPassword(auth, managerEmail, managerPassword);
      setLoadingNewAccount(false);
      navigate(bounceTo);
    }
    await setDoc(doc(db, "users", newUid), {
      email: newEmail,
      username: newUsername,
      roles: newRoles,
    });
    await sendPasswordResetEmail(auth, newEmail);
    return willReload;
  }

  async function deleteUser(username) {
    let uid, email;
    await Promise.all([
      findDocumentIdByUsername(username),
      findUserEmailByUsername(username),
    ]).then((responses) => {
      uid = responses[0];
      email = responses[1];
    });
    if (!uid || !email) return;
    await Promise.all([
      deleteDoc(doc(db, "users", uid)),
      setDoc(doc(db, "deletedUsers", uid), {
        email,
        uid,
      }),
    ]);
  }

  async function login(username, password) {
    await findUserEmailByUsername(username).then(async (email) => {
      if (email) await signInWithEmailAndPassword(auth, email, password);
      else throw new Error("Username not in database");
    });
  }

  async function logout() {
    await signOut(auth);
  }

  async function resetPassword(email) {
    if (await isEmailInUserDatabase(email)) {
      await sendPasswordResetEmail(auth, email);
    } else {
      throw new Error("User not in database");
    }
  }

  async function reauthenticate(password) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password,
    );
    await reauthenticateWithCredential(currentUser, credential);
  }

  async function changePassword(newPassword) {
    // should only be called by current user and shortly after authenticating
    await updatePassword(currentUser, newPassword);
  }

  async function changeUsername(currentUsername, newUsername) {
    if (await isUsernameInUserDatabase(newUsername)) {
      throw new Error("Username already in database");
    }
    const userDocId = await findDocumentIdByUsername(currentUsername);
    if (userDocId) {
      await updateDoc(doc(db, "users", userDocId), {
        username: newUsername,
      });
    } else {
      throw new Error("User not in database");
    }
  }

  async function changeRoles(username, newRoles) {
    const uid = await findDocumentIdByUsername(username);
    if (!uid) throw new Error("User not in database");
    await updateDoc(doc(db, "users", uid), { roles: newRoles });
  }

  function hasRole(role) {
    if (currentUser && userData) {
      return userData.roles.includes(role);
    } else return false;
  }

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setLoadingAccount(true);
      setCurrentUser(user);
      console.log("loggedIn:%o", !!user);
      setLoadingAccount(false);
    });
  }, []);

  useEffect(() => {
    // setLoading(false) twice. First one is a promise, so it gets executed later
    setLoadingData(true);
    if (dataUnsub) {
      dataUnsub.unsub();
      setDataUnsub(null);
    }
    if (currentUser) {
      let unsub = onSnapshot(doc(db, "users", currentUser.uid), (response) => {
        console.log("updated user data");
        if (!response.exists()) {
          logout();
          return;
        }
        setUserData(response.data());
        setLoadingData(false);
      });
      setDataUnsub({ unsub: unsub });
    } else {
      setUserData(null);
      setLoadingData(false);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    userData,
    login,
    createFirstAccount,
    logout,
    resetPassword,
    hasRole,
    reauthenticate,
    changeUsername,
    changePassword,
    changeRoles,
    createAnotherAccount,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loadingAccount && !loadingData && !loadingNewAccount && children}
      {loadingNewAccount && (
        <h1 className="text-center justify-content-center my-auto">
          Přidávám účet...
        </h1>
      )}
    </AuthContext.Provider>
  );
}
