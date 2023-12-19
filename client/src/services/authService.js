import { auth, firestore } from "./firebaseConfig";

import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

//store sign up user to firebase store:
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

//signup user
export const signUpWithEmailPassword = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential?.user;

    // Add additional user information to Firestore database
    const storeCredentials = {
      uid: user?.uid,
      email: user?.email,
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

    // Fetch additional user details from Firestore based on the UID
    const userDocRef = doc(firestore, "users", user.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      const userDetails = {
        token: user.accessToken,
        uid: user.uid,
        email: user.email,
        isEmailVerified: user.emailVerified,
        name: userSnapshot.data().name,
      };

      // Storing user details in localStorage
      localStorage.setItem("userDetails", JSON.stringify(userDetails));
      return { success: true, user: userDetails };
    } else {
      return { success: false, error: "User details not found" };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logOutUserWithEmailPasword = async () => {
  try {
    await signOut(auth);

    console.log("logout req. processed");
    localStorage.removeItem("userDetails");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, error: "Error logging out" };
  }
};
