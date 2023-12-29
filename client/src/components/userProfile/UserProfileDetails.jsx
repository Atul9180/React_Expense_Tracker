import React from "react";
import { Container, Row } from "react-bootstrap";

import { useSelector } from "react-redux";
import {
  selectedUser,
  selectedUserIsLoggedIn,
  selectedUserIsProfileComplete,
} from "../../redux/features/userSlice.js";

const UserProfileDetails = () => {
  const user = useSelector(selectedUser);
  const { email, userName, emailVerified } = user;
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);
  const isProfileComplete = useSelector(selectedUserIsProfileComplete);

  return (
    <>
      <Row className="mb-4 mt-4">
        <Container className="p-1 m-3 borderBottom shadow text-center">
          <h2>User Details:</h2>
        </Container>
        <h6>Name: {userName}</h6>
        <h6>Email: {email}</h6>
        <h6>UserLoggedIn: {isLoggedIn ? "true" : "false"}</h6>
        <h6>EmailVerified: {emailVerified ? "true" : "false"}</h6>
        <h6>ProfileUpdated: {isProfileComplete ? "true" : "false"}</h6>
      </Row>
    </>
  );
};

export default UserProfileDetails;
