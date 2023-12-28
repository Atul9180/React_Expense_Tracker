import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const useSyncedUserState = () => {
  const userSelector = useSelector((state) => state.auth);
  const [userStore, setUserStore] = useState(userSelector);

  useEffect(() => {
    setUserStore(userSelector);
  }, [userSelector]);

  return userStore;
};

export default useSyncedUserState;
