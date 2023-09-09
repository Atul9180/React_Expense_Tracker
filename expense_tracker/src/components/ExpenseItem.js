import "./ExpenseItem.css";
import React from "react";

function ExpenseItem({ expenses }) {
  // const expenseDate = new Date(2023, 2, 28);
  // const expenseItemDescription = "Car Insurance";
  // const expenseItemPrice = 294.67;

  return (
    <>
      {expenses.map((expense) => (
        <div className="expense-item" key={expense.expenseId}>
          <div>
            <span className="expense-date">
              {expense.expenseDate.toLocaleDateString()}
            </span>
          </div>
          <div className="expense-item__description">
            <h2>{expense.expenseItemDescription}</h2>
            <h2>{expense.locationOfExpenditure}</h2>
            <div className="expense-item__price">
              ${expense.expenseItemPrice}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ExpenseItem;
