import {
  App,
  AppOptions,
  cert,
  getApp,
  getApps,
  initializeApp,
  ServiceAccount,
} from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function createFirebaseAdminApp(config: AppOptions): App {
  if (getApps().length == 0) {
    return initializeApp(config);
  }
  return getApp();
}

const aServiceAccount: ServiceAccount = {
  projectId: process.env.PROJECT_ID,
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY,
};
const aFirebaseConfig: AppOptions = {
  credential: cert(aServiceAccount),
};

/**
 * admin-sdk Firebase App
 * ---
 * Firebase for the server.
 *
 * **SERVER-SIDE ONLY!!!**
 */
const aFirebaseApp = createFirebaseAdminApp(aFirebaseConfig);

export default aFirebaseApp;
/**
 * admin-sdk Auth
 * ---
 * Ability to validate user tokens on the server.
 *
 * **SERVER-SIDE ONLY!!!**
 */
export const aAuth = getAuth(aFirebaseApp);
/**
 * admin-sdk Firestore
 * ---
 * Has access to all documents in all collections.
 *
 * **SERVER-SIDE ONLY!!!**
 */
export const aFirestore = getFirestore(aFirebaseApp);
