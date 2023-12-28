import { auth, fireStore, fireStorage } from "./firebaseConfig";

import { collection, setDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { sendPasswordResetEmail, updateProfile } from "firebase/auth";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//store sign up user to firebase store:
export const addUserToFirestore = async (userData) => {
  try {
    //created collection("users"):
    const usersCollectionRef = collection(fireStore, "users");
    // Use the uid from userData as the document ID:
    const userDocRef = doc(usersCollectionRef, userData.uid);
    // Set new data in fireStore with the document ID as uid:
    await setDoc(userDocRef, userData);

    return { success: true, user: userData };
  } catch (error) {
    //console.error("Error adding user to fireStore: ", error.message);
    return { success: false, error: error.message };
  }
};

//update the existing collection referenced doc:
export const updateUserInFirestore = async (userData) => {
  try {
    const userDocRef = doc(fireStore, "users", userData.uid);

    await updateDoc(userDocRef, userData);
    //console.log("User updated : ", userData);
    return { success: true };
  } catch (error) {
    //console.error("Error updating or creating user: ", error.message);
    return { success: false, error: error.message };
  }
};

//signup user
export const signUpWithEmailPassword = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // const userCredential = await createUserWithEmailAndPassword(
    //   auth,
    //   email,
    //   password
    // );
    // const user = userCredential?.user;

    // const storeCredentials = {
    //   uid: user?.uid,
    //   email: user?.email,
    //   name: "Guest User",
    //   isProfileUpdated: false,
    //   createdAt: new Date().toLocaleString(),
    // };

    // await addUserToFirestore(storeCredentials);

    return { success: true, message: `Registration Successful. Please Login!` };
  } catch (error) {
    // console.error("Error signing up:", error.message);
    return { success: false, message: error.message };
  }
};

// Fetch user details from fireStore
export const fetchUserDetails = async (uid) => {
  try {
    const userDocRef = doc(fireStore, "users", uid);
    const userSnapshot = await getDoc(userDocRef);

    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    return null;
  }
};

//login user and fetch data from store:
export const loginWithEmailPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log("user after lgoin success: ", user);

    // Fetch additional user details from fireStore based on the UID
    //const userDetails = await fetchUserDetails(user.uid);
    if (!!user) {
      localStorage.setItem("user", JSON.stringify(user));
      return { success: true, user: user };
    }
    // if (userDetails) {
    //   const formattedDetails = {
    //     token: user.accessToken,
    //     isEmailVerified: user.emailVerified,
    //     isLoggedIn: !!user.accessToken,
    //     ...userDetails,  };
    // localStorage.setItem("user", JSON.stringify(formattedDetails));
    // return { success: true, user: formattedDetails };
    //}
    else {
      throw new Error();
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//login with Google account:
export const loginwithGoogleAccount = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;

    const userDetail = result?.user;
    if (!!userDetail)
      var data = {
        ...userDetail,
        token,
      };

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//send reset password email:
export const sendPasswordResetLinkOnEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, message: "Password reset link sent on mail." };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//send email verification link:
export const sendEmailVerificationLink = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      await sendEmailVerification(user);
      return {
        success: true,
        message: "Email Verification link sent on mail.",
      };
    } else {
      return { success: false, message: "User not authenticated." };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//logout user:
export const logOutUserWithEmailPasword = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error.message);
    return { success: false, error: error.message };
  }
};

//update user Profile data:
export const saveUserProfileData = async (accessToken, userName, imageFile) => {
  console.log(accessToken, userName, { imageFile });
  try {
    // 1. Upload image to Firebase Storage
    const storageRef = ref(
      fireStorage,
      `profile_images/${accessToken}/${imageFile.name}`
    );
    console.log(storageRef);
    const resbuyte = await uploadBytes(storageRef, imageFile);
    console.log({ resbuyte });
    // const fileNameMeta = `${new Date()}${imageUrl}${name}`;
    // console.log("dummyimagename: ", fileNameMeta);
    // const storageRef = ref(fireStorage, `userImages/${fileNameMeta}`);
    // await uploadBytes(storageRef, imageUrl);

    // 2. Get the image URL from Firebase Storage
    const downloadImageURL = await getDownloadURL(storageRef);
    console.log(downloadImageURL);

    // 3. Update user profile in Firebase Authentication
    const res = await updateProfile(accessToken, {
      displayName: userName,
      profileURL: downloadImageURL,
    });
    console.log({ res });
    //update data in FireStore:
    const userData = {
      name: userName,
      profileImage: downloadImageURL,
      isProfileUpdated: true,
    };

    console.log(userData);
    return {
      success: true,
      message: "profile saved successfully!",
      user: userData,
    };
  } catch (error) {
    //console.error("Error in updating profile");
    return { success: false, message: error.message };
  }
};

//setDoc: used to overwrite the existing reference doc..
//updateDOc: works only if already exists data else not
