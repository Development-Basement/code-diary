import { aAuth } from "@lib/firebase-admin";
import type { NextApiRequest, NextApiResponse } from "next";

// an example API endpoint using admin firebase

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // auth test
  const token = req.cookies.auth;
  console.log(req.cookies);
  let isLoggedIn = false;
  if (token !== undefined) {
    await aAuth.verifyIdToken(token);
    isLoggedIn = true;
  }
  res.status(200).send(`isLoggedIn: ${isLoggedIn}`);
}
