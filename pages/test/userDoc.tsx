import { auth, db } from "@lib/firebase";
import { converter, UserDoc } from "@lib/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function TestUserDoc() {
  const [docData, setDocData] = useState<UserDoc>();

  useEffect(() => {
    async function getDocument() {
      const credential = await signInWithEmailAndPassword(
        auth,
        "mistradam@post.cz",
        "qwerty",
      );
      const docRef = doc(db, "users", credential.user.uid).withConverter(
        converter<UserDoc>(),
      );
      const document = await getDoc(docRef).catch((e) => {
        console.error(e.message);
        return undefined;
      });
      setDocData(document?.data());
      // legal updates
      setTimeout(async () => {
        await updateDoc(docRef, { profileColor: "#606060" });
      }, 5);
      setTimeout(async () => {
        await updateDoc(docRef, { profileColor: "#ccff00" });
      }, 10);
    }
    getDocument();
  }, []);

  return (
    <div>
      {docData ? (
        <>
          groups: {docData.groups}
          <br />
          invites:
          {JSON.stringify(docData.invites)
            .replaceAll(/"/g, " ")
            .replaceAll(/ :/g, ":")
            .replaceAll(/ ,/g, ",")}
          <br />
          profileColor: {docData.profileColor}
          <br />
          username: {docData.username}
        </>
      ) : (
        "Fetching doc data"
      )}
    </div>
  );
}
