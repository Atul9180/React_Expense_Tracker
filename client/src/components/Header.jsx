import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { logoutAsyncThunk } from "../redux/authThunk";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state?.auth);
  const isLoggedIn = !!user;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      console.log("logout btn clicked");
      await dispatch(logoutAsyncThunk()); // Dispatch the logout action
      console.log("logout response received");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="d-flex w-full bg-red justify-between">
      <h1>Header</h1>
      {isLoggedIn && <Button onClick={logoutHandler}>Logut</Button>}
    </div>
  );
};

export default Header;
