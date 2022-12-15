import { useAuth } from "@contexts/authContext";
import { auth, db } from "@lib/firebase";
import { converter, UserPublicDoc } from "@lib/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function TestUserDoc() {
  const [docData, setDocData] = useState<UserPublicDoc>();

  const { currentUser } = useAuth();

  useEffect(() => {
    async function getDocument() {
      const credential = await signInWithEmailAndPassword(
        auth,
        "mistradam@post.cz",
        "qwerty",
      ); // NDVSXudpVlQHdPoPnW7mVtJB1ky1
      const docRef = doc(db, "users", credential.user.uid).withConverter(
        converter<UserPublicDoc>(),
      );
      const unsub = onSnapshot(
        docRef,
        (snap) => {
          setDocData(snap.data());
        },
        (e) => {
          console.error(e.message);
          return undefined;
        },
      );
      // legal updates
      setTimeout(async () => {
        await updateDoc(docRef, { profileColor: "#606060" });
        console.log("Updated doc v1");
      }, 5000);
      setTimeout(async () => {
        await updateDoc(docRef, { profileColor: "#ccff00" });
        console.log("Updated doc v2");
      }, 10000);
      return unsub;
    }
    getDocument();
  }, []);

  return (
    <div>
      <>
        currentUser: {currentUser?.uid}
        <br />
        {docData ? (
          <>
            profileColor: {docData.profileColor}
            <br />
            username: {docData.username}
          </>
        ) : (
          "Fetching doc data"
        )}
      </>
    </div>
  );
}
