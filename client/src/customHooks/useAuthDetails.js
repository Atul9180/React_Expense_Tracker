import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { SetActiveUserState } from "../redux/features/userSlice";
import { setLogOutState } from "../redux/features/userSlice";
import { useDispatch } from "react-redux";

const useAuthChangeDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const listenAuthStateChange = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          SetActiveUserState({
            email: user.email,
            accessToken: user.accessToken,
            uid: user.uid,
            displayName: user.displayName,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setLogOutState());
      }
    });
    return () => listenAuthStateChange();
  }, [dispatch]);

  return null;
};

export default useAuthChangeDetails;
