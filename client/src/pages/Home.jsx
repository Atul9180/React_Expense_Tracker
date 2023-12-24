import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Expenses from "../components/expenses/Expenses";

// import { useSelector } from "react-redux";

const Home = () => {
  // const { user, loading, error } = useSelector((state) => state.auth);
  // const { email, name, isEmailVerified } = user;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setError(null);
      setIsLoading(true);
      const storedUserDetails = JSON.parse(localStorage.getItem("user"));
      setUser(storedUserDetails);
      setIsLoading(false);
    } catch (err) {
      console.log("Home Error", err);
      setError(err.message);
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Container className="" style={{ minHeight: "85vh", paddingTop: "4vh" }}>
        <h1 className="text-center">Add Expense</h1>
        <br />
        <Expenses />
        <br />
        <hr />

        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Signup</Link>

        {isLoading && <h2>Loading...</h2>}
        {error && <p>Error: {error}</p>}
        {user && (
          <div>
            <h2 className="font-bold">User Details:</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>EmailVerified: {user.isEmailVerified}</p>
            <p>ProfileUpdated: {user.isProfileUpdated}</p>
          </div>
        )}
      </Container>
    </>
  );
};

export default Home;
