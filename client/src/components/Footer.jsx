import React from "react";
import { useSelector } from "react-redux";
import { selectTheme } from "../redux/features/themeSlice";

const year = new Date().getFullYear();
const Footer = () => {
  const isDarkMode = useSelector(selectTheme);

  return (
    <div
      className={
        isDarkMode
          ? "bg-dark text-light text-center w-full"
          : "bg-light text-dark text-center w-full"
      }
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
