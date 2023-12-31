import React from "react";

import { UserProfileDetails } from "../components/index.js";

import { useSelector } from "react-redux";
import { selectedUserIsLoggedIn } from "../redux/features/userSlice.js";
import { selectTheme } from "../redux/features/themeSlice.js";

const Home = () => {
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);
  const isDarkMode = useSelector(selectTheme);

  return (
    <div className={isDarkMode ? "bg-dark text-light" : "bg-light text-dark"}>
      {isLoggedIn && <UserProfileDetails />}

      {!isLoggedIn && (
        <h3 className="text-center">Error in fetching user data!</h3>
      )}
    </div>
  );
};

export default Home;
