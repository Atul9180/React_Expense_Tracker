import { auth, fireStore, fireStorage } from "./firebaseConfig";

import {
  collection,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
} from "firebase/auth";
import { sendPasswordResetEmail, updateProfile, signOut } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

//adding expense to firestore:
export const addExpenseToFirestore = async (expenseData) => {
  try {
    const expensesCollectionRef = collection(
      fireStore,
      `expenseTracker/expenses/${auth.currentUser.uid}`
    );
    const expenseDocRef = doc(expensesCollectionRef, expenseData.id);
    await setDoc(expenseDocRef, expenseData);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//update expense:
export const updateExpenseInFirestore = async (
  expenseId,
  updatedExpenseData
) => {
  try {
    const expenseDocRef = doc(
      fireStore,
      `expenseTracker/expenses/${auth.currentUser.uid}`,
      expenseId
    );
    await updateDoc(expenseDocRef, updatedExpenseData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//fetch exxpenses:
export const fetchAllExpensesFromFirestore = async () => {
  try {
    const user = auth.currentUser;
    const expensesCollectionRef = collection(
      fireStore,
      `expenseTracker/expenses/${user.uid}`
    );

    const snapshot = await getDocs(expensesCollectionRef);

    const expenses = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, expenses: expenses };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//deleteExpenses:
export const deleteExpenseFromFirestore = async (expenseId) => {
  try {
    const user = auth.currentUser;
    const expenseRef = doc(
      fireStore,
      `expenseTracker/expenses/${user.uid}`,
      expenseId
    );
    await deleteDoc(expenseRef);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//store sign up user to firebase store:
export const adddataToFirestore = async (data) => {
  try {
    //created collection("users"):
    const usersCollectionRef = collection(fireStore, "expenseTracker/expenses");
    // Use the uid from data as the document ID:
    const userDocRef = doc(usersCollectionRef, auth?.currentUser?.uid);
    // Set new data in fireStore with the document ID as uid:
    await setDoc(userDocRef, data);

    return { success: true, user: data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

//update the existing collection referenced doc:
export const updateUserInFirestore = async (Data) => {
  try {
    const userDocRef = doc(
      fireStore,
      "expenseTracker/expenses",
      auth?.currentUser?.uid
    );

    await updateDoc(userDocRef, Data);
    localStorage.setItem("userProfile", JSON.stringify(Data));
    //console.log("User updated : ", userData);
    return { success: true };
  } catch (error) {
    //console.error("Error updating or creating user: ", error.message);
    return { success: false, error: error.message };
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

//login user and fetch data from store:
export const loginWithEmailPassword = async (email, password) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;
    //console.log("user after lgoin success: ", user);

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
    localStorage.removeItem("userProfile");
    localStorage.removeItem("expenses");
    return { success: true };
  } catch (error) {
    console.error("Error logging out:", error.message);
    return { success: false, error: error.message };
  }
};

//update user Profile data:
export const updateUserProfileData = async (userName, imageFile) => {
  try {
    const user = auth.currentUser;

    // 1. Upload image to Firebase Storage
    const storageRef = ref(
      fireStorage,
      `profile_images/${user.uid}${imageFile.name}`
    );
    await uploadBytes(storageRef, imageFile);

    // const fileNameMeta = `${new Date()}${imageUrl}${name}`;
    // console.log("dummyimagename: ", fileNameMeta);
    // const storageRef = ref(fireStorage, `userImages/${fileNameMeta}`);
    // await uploadBytes(storageRef, imageUrl);

    // 2. Get the image URL from Firebase Storage
    const downloadImageURL = await getDownloadURL(storageRef);

    // 3. Update user profile in Firebase Authentication
    await updateProfile(user, {
      displayName: userName,
      photoURL: downloadImageURL,
    });

    //if (!res) throw new Error();
    //update data in FireStore:
    // const userData = {
    //   name: userName,
    //   profileImage: downloadImageURL,
    //   isProfileUpdated: true,
    // };

    // console.log(userData);
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        name: userName,
        profileImage: downloadImageURL,
        isProfileUpdated: true,
      })
    );
    return {
      success: true,
      message: "profile updated successfully!",
      user: {
        name: userName,
        profileImage: downloadImageURL,
        isProfileUpdated: true,
      },
    };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

//setDoc: used to overwrite the existing reference doc..
//updateDOc: works only if already exists data else not
