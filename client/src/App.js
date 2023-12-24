import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import AppRouter from "./routes/AppRouter";
import { Footer, Header, UserProfileStatus } from "./components/index";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  // const [firebaseError, setFirebaseError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleFirebaseAuthChange = (user) => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // };

  // const handleFirebaseError = (error) => {
  //   toast.error(error)
  //   setFirebaseError(true);
  // };

  //fallbackplan:
  // const handleLocalStorageFallback = () => {
  //   const token = localStorage.getItem("token") || null;
  //   const user = JSON.parse(localStorage.getItem("user"));
  //   if (user && user.isLoggedIn) {
  //     const userLoggedIn = !!token && user && user.isLoggedIn;
  //     setIsLoggedIn(userLoggedIn);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // };

  //Monitor currently loggedin user;
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(
  //     auth,
  //     handleFirebaseAuthChange,
  //     handleFirebaseError
  //   );
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const token = user.accessToken;
        // const {uid,accessToken,photoURL,emailVerified,email,displayName}=user
        // console.log({ user });
        if (!!token) toast.success("logged in ");
        setIsLoggedIn(!!token);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   if (firebaseError) {
  //     handleLocalStorageFallback();
  //   }
  // }, [firebaseError]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Header isLoggedIn={isLoggedIn} />
      {isLoggedIn ? <UserProfileStatus /> : ""}
      <AppRouter isLoggedIn={isLoggedIn} />
      <Footer />
    </BrowserRouter>
  );
};

export default App;
