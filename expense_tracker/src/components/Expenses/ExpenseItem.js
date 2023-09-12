import "./ExpenseItem.css";
import React, { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI_components/Card"; //custom component

const ExpenseItem = ({ expense, onDelete }) => {
  const [expenseAmount, setExpenseAmount] = useState(expense.amount);

  const changeExpense = () => {
    setExpenseAmount(100);
  };
  const deleteHandler = () => {
    onDelete(expense.id);
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={expense.date} />
      <div className="expense-item__description">
        <h2>{expense.title}</h2>
        {/* <h2>{expense.location}</h2> */}
        <div className="expense-item__price">Rs. {expenseAmount}</div>
        <div onClick={changeExpense} className="expense-item__price">
          Change Price
        </div>
        <div
          onClick={deleteHandler}
          className="expense-item__price expense-delete"
        >
          Delete
        </div>
      </div>
    </Card>
  );
};

export default ExpenseItem;
