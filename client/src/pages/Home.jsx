import React from "react";

import { UserProfileDetails } from "../components/index.js";

import { useSelector } from "react-redux";
import { selectedUserIsLoggedIn } from "../redux/features/userSlice.js";

const Home = () => {
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);

  return (
    <>
      {isLoggedIn && <UserProfileDetails />}

      {!isLoggedIn && (
        <h3 className="text-center">Error in fetching user data!</h3>
      )}
    </>
  );
};

export default Home;
