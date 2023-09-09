import React from "react";
import ExpenseDetails from "./ExpenseDetails";

function ExpenseList({ expenses }) {
  return (
    <>
      {expenses.map((expense) => (
        <ExpenseDetails key={expense.expenseId} expense={expense} />
      ))}
    </>
  );
}

export default ExpenseList;
