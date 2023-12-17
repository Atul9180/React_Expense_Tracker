import React from "react";
import { Button } from "react-bootstrap";

const Header = () => {
  return (
    <div className="d-flex w-full background-red justify-between">
      <h1>Header</h1>
      <Button>Logut</Button>
    </div>
  );
};

export default Header;
