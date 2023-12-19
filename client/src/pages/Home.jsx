import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "primereact/button";
import { useSelector } from "react-redux";

const Home = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const { email, name, isEmailVerified } = user;

  return (
    <div>
      <h1>My Home App</h1>
      <h3>Welcome to Expense Tracker</h3>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && (
        <div>
          <h2 className="font-bold">User Details:</h2>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          {/* <p>Token: {token}</p> */}
          {/* <p>UserId: {uid}</p> */}
          <p>EmailVerified: {isEmailVerified}</p>
        </div>
      )}
      {/* <Button label="Click Me" /> */}
    </div>
  );
};

export default Home;
