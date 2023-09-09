import React from "react";
import "./ExpenseDate.css";

const ExpenseDate = ({ date }) => {
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const year = date.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date_month">{month}</div>
      <div className="expense-date_day">{day}</div>
      <div className="expense-date_year">{year}</div>
    </div>
  );
};

export default ExpenseDate;
