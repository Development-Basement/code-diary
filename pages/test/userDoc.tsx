import { auth, db } from "@lib/firebase";
import { converter, UserDoc } from "@lib/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

export default function TestUserDoc() {
  let [docData, setDocData] = useState<UserDoc>();

  useEffect(() => {
    async function getDocument() {
      const credential = await signInWithEmailAndPassword(
        auth,
        "mistradam@post.cz",
        "qwerty",
      );
      let docRef = doc(db, "users", credential.user.uid).withConverter(
        converter<UserDoc>(),
      );
      let document = await getDoc(docRef).catch((e) => {
        console.error(e.message);
        return undefined;
      });
      setDocData(document?.data());
    }
    getDocument();
  }, []);

  return (
    <div>
      {docData ? (
        <>
          groups: {docData.groups}
          <br />
          invites: {/* eslint-disable-next-line quotes */}
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
