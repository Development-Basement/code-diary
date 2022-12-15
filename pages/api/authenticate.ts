import { aAuth } from "@lib/firebase-admin";
import { NextApiRequest, NextApiResponse } from "next";

export type AuthenticateResData = {
  loggedIn: boolean;
};

async function authenticateUser(token?: string) {
  if (token === undefined) return false;
  try {
    await aAuth.verifyIdToken(token);
    return true;
  } catch (e) {
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthenticateResData>,
) {
  if (typeof req.headers.auth === "object") {
    res.status(400);
    return;
  }
  const isLoggedIn = await authenticateUser(req.headers.auth);
  res.status(200).json({ loggedIn: isLoggedIn });
}
