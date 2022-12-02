import {
  FirebaseApp,
  FirebaseOptions,
  getApp,
  getApps,
  initializeApp,
} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function createFirebaseApp(config: FirebaseOptions): FirebaseApp {
  if (getApps().length == 0) {
    return initializeApp(firebaseConfig);
  }
  return getApp();
}

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const firebaseApp = createFirebaseApp(firebaseConfig);

export default firebaseApp;
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
