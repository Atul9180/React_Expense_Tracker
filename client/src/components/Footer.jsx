import React from "react";

const year = new Date().getFullYear();
const Footer = () => {
  return (
    <div
      className="shadow text-center w-full"
      style={{
        background: "aliceblue",
        padding: "8px",
        fontSize: "large",
        fontWeight: "bold",
      }}
    >
      &copy; {year} All Rights Reserved
    </div>
  );
};

export default Footer;
