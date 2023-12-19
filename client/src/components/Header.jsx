import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logOutUserWithEmailPasword } from "../services/authService";

const Header = () => {
  const navigate = useNavigate();

  const logoutHandler = async () => {
    console.log("logout btn clicked");
    const result = await logOutUserWithEmailPasword();
    console.log("logout response received");
    if (result.success) navigate("/login");
  };
  return (
    <div className="d-flex w-full background-red justify-between">
      <h1>Header</h1>
      <Button onClick={logoutHandler}>Logut</Button>
    </div>
  );
};

export default Header;
