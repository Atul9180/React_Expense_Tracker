import React from "react";
import { createPortal } from "react-dom";
import styles from "./Loader.module.css";
import loaderImage from "../../assets/loader.gif";

const Loader = () => {
  const loaderRoot = document.getElementById("loader");

  return createPortal(
    // <div className="position-fixed w-100 h-100 bg-dark d-flex justify-content-center align-items-center">
    //   <div className="spinner-border text-light" role="status">
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <img src={loaderImage} alt="Loading..." />
      </div>
    </div>,
    loaderRoot
  );
};

export default Loader;
