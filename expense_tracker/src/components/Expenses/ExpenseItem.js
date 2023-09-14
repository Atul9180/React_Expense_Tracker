import "./ExpenseItem.css";
import React from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI_components/Card"; //custom component

const ExpenseItem = ({ expense, onDelete }) => {
  const deleteHandler = () => {
    onDelete(expense.id);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={expense.date} />
      <div className="expense-item__description">
        <h2>{expense.title}</h2>
        <h2>Rs. {expense.amount}</h2>
        <h2>{expense.location}</h2>

        <div onClick={deleteHandler} className="expense-btn expense-delete">
          Delete
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
