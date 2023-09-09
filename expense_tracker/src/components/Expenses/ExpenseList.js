import React from "react";
import ExpenseDetails from "./ExpenseDetails";

const ExpenseList = ({ expenses }) => {
  return (
    <>
      {expenses.map((expense) => (
        <ExpenseDetails key={expense.expenseId} expense={expense} />
      ))}
    </>
  );
};

export default ExpenseList;
