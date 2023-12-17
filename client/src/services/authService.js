import { auth, firestore } from "./firebaseConfig";

import { collection, setDoc, doc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const addUserToFirestore = async (userData) => {
  try {
    //created collection
    const usersCollectionRef = collection(firestore, "users");

    // Use the localId from userData as the document ID
    const userDocRef = doc(usersCollectionRef, userData.uid);

    // Set user data in Firestore with the document ID as uid
    await setDoc(userDocRef, userData);
    console.log("User added with : ", { userData });
    return { success: true, user: userData };
  } catch (error) {
    console.error("Error adding user to Firestore: ", error);
    return { success: false, error: error.message };
  }
};

export const signUpWithEmailPassword = async (email, password, displayName) => {
  // console.log(email, password, displayName);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
      displayName
    );
    const user = userCredential.user;

    // Add additional user information to Firestore database
    const storeCredentials = {
      uid: user.uid,
      email: user.email,
      name: displayName,
      createdAt: new Date().toLocaleString(),
    };

    await addUserToFirestore(storeCredentials);

    console.log("Signed up successfully:", storeCredentials);
    return { success: true, user: storeCredentials };
  } catch (error) {
    console.error("Error signing up:", error);
    return { success: false, error: error.message };
  }
};

export const loginWithEmailPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log({ user });

    //const res=await getUserDetails(users,user.uid);

    const userDetails = {
      token: user.accessToken,
      uid: user.uid,
      email: user.email,
      isEmailVerified: user.emailVerified,
      name: user.displayName,
    };
    // Storing user details in localStorage
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    return { success: true, user: userDetails };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
