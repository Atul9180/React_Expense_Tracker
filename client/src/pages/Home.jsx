import React from "react";
import { Container } from "react-bootstrap";

import { UserProfileDetails } from "../components/index.js";

import { useSelector } from "react-redux";
import { selectedUserIsLoggedIn } from "../redux/features/userSlice.js";

const Home = () => {
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);

  return (
    <>
      <Container className="" style={{ minHeight: "85vh", paddingTop: "4vh" }}>
        {isLoggedIn && <UserProfileDetails />}

        {!isLoggedIn && (
          <h3 className="text-center">Error in fetching user data!</h3>
        )}
      </Container>
    </>
  );
};

export default Home;
