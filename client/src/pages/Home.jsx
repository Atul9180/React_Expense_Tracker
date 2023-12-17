import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "primereact/button";

const Home = () => {
  return (
    <div>
      <h1>My Home App</h1>
      <h3>Welcome to Expense Tracker</h3>
      <Link to="/login">Login</Link>
      <br />
      <Link to="/signup">Signup</Link>
      {/* <Button label="Click Me" /> */}
    </div>
  );
};

export default Home;
