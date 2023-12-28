import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Expenses from "../components/expenses/Expenses";

import { useSelector } from "react-redux";
import {
  selectedUser,
  selectedUserIsLoggedIn,
  selectedUserIsProfileComplete,
} from "../redux/features/userSlice.js";

const Home = () => {
  const user = useSelector(selectedUser);
  const { email, uid, userName, emailVerified, photoURL } = user;
  const isLoggedIn = useSelector(selectedUserIsLoggedIn);
  const isProfileComplete = useSelector(selectedUserIsProfileComplete);

  const [isLoading] = useState(false);
  const [error] = useState(null);

  return (
    <>
      <Container className="" style={{ minHeight: "85vh", paddingTop: "4vh" }}>
        <div className="p-1 m-2 borderBottom shadow text-center">
          <h2>Add Expense</h2>
        </div>
        <br />
        <Expenses />
        <br />
        <hr />

        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Signup</Link>

        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error: {error}</p>}
        {isLoggedIn && user ? (
          <div className="mb-4">
            <Container className="p-1 m-3 borderBottom shadow text-center">
              <h2>User Details:</h2>
            </Container>
            <h6>Name: {userName}</h6>
            <h6>PhotoUrl: {photoURL ? photoURL : "not available"}</h6>
            <h6>Email: {email}</h6>
            <h6>UserId: {uid}</h6>
            <h6>UserLoggedIn: {isLoggedIn ? "true" : "false"}</h6>
            <h6>EmailVerified: {emailVerified ? "true" : "false"}</h6>
            <h6>ProfileUpdated: {isProfileComplete ? "true" : "false"}</h6>
          </div>
        ) : (
          <h3 className="text-center">Error in fetching user data!</h3>
        )}
      </Container>
    </>
  );
};

export default Home;
