import React from "react";
import "./Card.css";

const Card = (props) => {
  // adding card class along with other classes added to className in custom component Card in future
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
};

export default Card;
