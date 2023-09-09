import "./ExpenseDetails.css";
import React from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI_components/Card"; //custom component

const ExpenseDetails = ({ expense }) => {
  return (
    <Card className="expense-item">
      <ExpenseDate date={expense.expenseDate} />
      <div className="expense-item__description">
        <h2>{expense.expenseItemDescription}</h2>
        <h2>{expense.locationOfExpenditure}</h2>
        <div className="expense-item__price">
          Rs. {expense.expenseItemPrice}
        </div>
      </div>
    </Card>
  );
};

export default ExpenseDetails;
