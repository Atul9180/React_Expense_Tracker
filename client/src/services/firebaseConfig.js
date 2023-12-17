import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIRE_API_KEY}`,
  authDomain: `${process.env.REACT_APP_FIRE_AUTH_DOMAIN}`,
  projectId: `${process.env.REACT_APP_FIRE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIRE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIRE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIRE_APP_ID}`,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export { auth, firestore };
