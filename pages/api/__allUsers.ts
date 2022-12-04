import { aAuth, aFirestore } from "@lib/firebase-admin";
import { aConverter } from "@lib/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  isLoggedIn: boolean;
  users: Map<string, string>;
};

// an example API endpoint using admin firebase

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // auth test
  //! MIGHT NOT WORK!!!
  const token = req.headers.authorization;
  let isLoggedIn;
  if (token === undefined) {
    isLoggedIn = false;
  } else {
    try {
      await aAuth.verifyIdToken(token);
      isLoggedIn = true;
    } catch (err) {
      isLoggedIn = false;
    }
  }
  // Firestore test
  const document = await aFirestore
    .doc("users/allUsers")
    .withConverter(aConverter<Data>())
    .get();
  const data = document.data();
  if (data === undefined || data.users === undefined) {
    res.status(404).end();
    return;
  }
  res.status(200).json({ isLoggedIn, users: data.users });
}
