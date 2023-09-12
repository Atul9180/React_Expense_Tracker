import React from "react";
import ExpenseItem from "./ExpenseItem";
// import "./Expenses.css";

const Expenses = (props) => {
  return (
    <>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={props.deleteExpenseHandler}
        />
      ))}
    </>
  );
};

export default Expenses;
